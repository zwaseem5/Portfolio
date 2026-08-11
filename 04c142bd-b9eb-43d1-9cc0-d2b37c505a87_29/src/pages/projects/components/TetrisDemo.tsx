import { useState, useEffect, useCallback } from 'react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const EMPTY_CELL = 0;

const TETROMINOS = {
  I: { shape: [[1, 1, 1, 1]], color: '#00f5ff' },
  O: { shape: [[1, 1], [1, 1]], color: '#ffff00' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#a000f0' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#00f000' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#f00000' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#0000f0' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#f0a000' }
};

export default function TetrisDemo() {
  const [board, setBoard] = useState(() => 
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(EMPTY_CELL))
  );
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const createRandomPiece = useCallback(() => {
    const pieces = Object.keys(TETROMINOS);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    return {
      type: randomPiece,
      shape: TETROMINOS[randomPiece].shape,
      color: TETROMINOS[randomPiece].color,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(TETROMINOS[randomPiece].shape[0].length / 2),
      y: 0
    };
  }, []);

  const isValidMove = useCallback((piece, newX, newY, newShape = piece.shape) => {
    for (let y = 0; y < newShape.length; y++) {
      for (let x = 0; x < newShape[y].length; x++) {
        if (newShape[y][x]) {
          const boardX = newX + x;
          const boardY = newY + y;
          
          if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
            return false;
          }
          
          if (boardY >= 0 && board[boardY][boardX] !== EMPTY_CELL) {
            return false;
          }
        }
      }
    }
    return true;
  }, [board]);

  const rotatePiece = useCallback((shape) => {
    const rotated = shape[0].map((_, index) =>
      shape.map(row => row[index]).reverse()
    );
    return rotated;
  }, []);

  const placePiece = useCallback((pieceToPlace) => {
    const piece = pieceToPlace || currentPiece;
    if (!piece) return;

    const newBoard = board.map(row => [...row]);

    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardY = piece.y + y;
          const boardX = piece.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = piece.color;
          }
        }
      }
    }

    // Check for completed lines
    let linesCleared = 0;
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (newBoard[y].every(cell => cell !== EMPTY_CELL)) {
        newBoard.splice(y, 1);
        newBoard.unshift(Array(BOARD_WIDTH).fill(EMPTY_CELL));
        linesCleared++;
        y++; // Check the same line again
      }
    }

    if (linesCleared > 0) {
      setLines(prev => prev + linesCleared);
      setScore(prev => prev + linesCleared * 100 * level);
      setLevel(prev => Math.floor((lines + linesCleared) / 10) + 1);
    }

    setBoard(newBoard);
    setCurrentPiece(nextPiece);
    setNextPiece(createRandomPiece());

    // Check game over
    if (nextPiece && !isValidMove(nextPiece, nextPiece.x, nextPiece.y)) {
      setGameOver(true);
    }
  }, [currentPiece, nextPiece, board, level, lines, isValidMove, createRandomPiece]);

  const movePiece = useCallback((dx, dy) => {
    if (!currentPiece || gameOver || isPaused) return;

    const newX = currentPiece.x + dx;
    const newY = currentPiece.y + dy;

    if (isValidMove(currentPiece, newX, newY)) {
      setCurrentPiece(prev => ({ ...prev, x: newX, y: newY }));
    } else if (dy > 0) {
      placePiece();
    }
  }, [currentPiece, gameOver, isPaused, isValidMove, placePiece]);

  const rotatePieceHandler = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    const rotatedShape = rotatePiece(currentPiece.shape);
    if (isValidMove(currentPiece, currentPiece.x, currentPiece.y, rotatedShape)) {
      setCurrentPiece(prev => ({ ...prev, shape: rotatedShape }));
    }
  }, [currentPiece, gameOver, isPaused, rotatePiece, isValidMove]);

  const dropPiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;

    let newY = currentPiece.y;
    while (isValidMove(currentPiece, currentPiece.x, newY + 1)) {
      newY++;
    }
    placePiece({ ...currentPiece, y: newY });
  }, [currentPiece, gameOver, isPaused, isValidMove, placePiece]);

  const startGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(EMPTY_CELL)));
    setCurrentPiece(createRandomPiece());
    setNextPiece(createRandomPiece());
    setScore(0);
    setLevel(1);
    setLines(0);
    setGameOver(false);
    setGameStarted(true);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const interval = setInterval(() => {
      movePiece(0, 1);
    }, Math.max(50, 500 - (level - 1) * 50));

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, isPaused, level, movePiece]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted || gameOver) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          e.preventDefault();
          movePiece(0, 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotatePieceHandler();
          break;
        case ' ':
          e.preventDefault();
          dropPiece();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          togglePause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameOver, movePiece, rotatePieceHandler, dropPiece]);

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    
    // Add current piece to display board
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.y + y;
            const boardX = currentPiece.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }

    return displayBoard.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={x}
            className="w-6 h-6 border border-zinc-800"
            style={{
              backgroundColor: cell === EMPTY_CELL ? '#111113' : cell,
              boxShadow: cell !== EMPTY_CELL ? 'inset 0 0 0 1px rgba(255,255,255,0.3)' : 'none'
            }}
          />
        ))}
      </div>
    ));
  };

  const renderNextPiece = () => {
    if (!nextPiece) return null;

    return nextPiece.shape.map((row, y) => (
      <div key={y} className="flex justify-center">
        {row.map((cell, x) => (
          <div
            key={x}
            className="w-4 h-4 border border-gray-700"
            style={{
              backgroundColor: cell ? nextPiece.color : 'transparent'
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-1 text-white">Minimal Tetris</h1>
          <p className="text-zinc-500 text-sm">Classic block-stacking puzzle game</p>
        </div>

        <div className="flex justify-center items-start gap-8">
          {/* Game Board */}
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-md p-6">
            <div className="bg-black p-3 rounded border border-zinc-800">
              {renderBoard()}
            </div>

            {gameOver && (
              <div className="absolute inset-0 bg-black/90 flex items-center justify-center rounded-md">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-red-400 mb-3">Game Over</h3>
                  <p className="text-zinc-400 mb-4">Final Score: {score}</p>
                  <button
                    onClick={startGame}
                    className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 rounded font-semibold transition-colors duration-150 whitespace-nowrap"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}

            {isPaused && !gameOver && (
              <div className="absolute inset-0 bg-black/90 flex items-center justify-center rounded-md">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-3">Paused</h3>
                  <button
                    onClick={togglePause}
                    className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 rounded font-semibold transition-colors duration-150 whitespace-nowrap"
                  >
                    Resume
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Game Info */}
          <div className="space-y-4">
            {/* Score */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-md p-5 min-w-[200px]">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Score</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Score</span>
                  <span className="text-white font-bold">{score.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Level</span>
                  <span className="text-white font-bold">{level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Lines</span>
                  <span className="text-white font-bold">{lines}</span>
                </div>
              </div>
            </div>

            {/* Next Piece */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-md p-5">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Next</h3>
              <div className="bg-black p-3 rounded border border-zinc-800">
                {renderNextPiece()}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-md p-5">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Controls</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Move</span>
                  <span className="text-zinc-200">← →</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Rotate</span>
                  <span className="text-zinc-200">↑</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Soft Drop</span>
                  <span className="text-zinc-200">↓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Hard Drop</span>
                  <span className="text-zinc-200">Space</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Pause</span>
                  <span className="text-zinc-200">P</span>
                </div>
              </div>
            </div>

            {/* Game Controls */}
            <div className="space-y-2">
              {!gameStarted ? (
                <button
                  onClick={startGame}
                  className="w-full px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 rounded font-semibold transition-colors duration-150 whitespace-nowrap"
                >
                  <i className="ri-play-line mr-2"></i>
                  Start Game
                </button>
              ) : (
                <>
                  <button
                    onClick={togglePause}
                    className="w-full px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded font-semibold transition-colors duration-150 whitespace-nowrap"
                  >
                    <i className={`${isPaused ? 'ri-play-line' : 'ri-pause-line'} mr-2`}></i>
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                  <button
                    onClick={startGame}
                    className="w-full px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-red-400 hover:text-red-300 rounded font-semibold transition-colors duration-150 whitespace-nowrap"
                  >
                    <i className="ri-restart-line mr-2"></i>
                    Restart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}