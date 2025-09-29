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

  const placePiece = useCallback(() => {
    if (!currentPiece) return;

    const newBoard = board.map(row => [...row]);
    
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.y + y;
          const boardX = currentPiece.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = currentPiece.color;
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
    setCurrentPiece(prev => ({ ...prev, y: newY }));
    setTimeout(placePiece, 100);
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
            className="w-6 h-6 border border-gray-600"
            style={{
              backgroundColor: cell === EMPTY_CELL ? '#1a1a1a' : cell,
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Minimal Tetris
          </h1>
          <p className="text-gray-300">Classic block-stacking puzzle game</p>
        </div>

        <div className="flex justify-center items-start gap-8">
          {/* Game Board */}
          <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6">
            <div className="bg-black/50 p-4 rounded-lg">
              {renderBoard()}
            </div>
            
            {gameOver && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-2xl">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-red-400 mb-4">Game Over!</h3>
                  <p className="text-gray-300 mb-4">Final Score: {score}</p>
                  <button
                    onClick={startGame}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg font-semibold hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 whitespace-nowrap"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}

            {isPaused && !gameOver && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-2xl">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-yellow-400 mb-4">Paused</h3>
                  <button
                    onClick={togglePause}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg font-semibold hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 whitespace-nowrap"
                  >
                    Resume
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Game Info */}
          <div className="space-y-6">
            {/* Score */}
            <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 min-w-[200px]">
              <h3 className="text-lg font-bold mb-4 text-cyan-300">Score</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Score:</span>
                  <span className="text-white font-bold">{score.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Level:</span>
                  <span className="text-white font-bold">{level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Lines:</span>
                  <span className="text-white font-bold">{lines}</span>
                </div>
              </div>
            </div>

            {/* Next Piece */}
            <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 text-cyan-300">Next</h3>
              <div className="bg-black/50 p-4 rounded-lg">
                {renderNextPiece()}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 text-cyan-300">Controls</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Move:</span>
                  <span className="text-white">← →</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rotate:</span>
                  <span className="text-white">↑</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Soft Drop:</span>
                  <span className="text-white">↓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hard Drop:</span>
                  <span className="text-white">Space</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pause:</span>
                  <span className="text-white">P</span>
                </div>
              </div>
            </div>

            {/* Game Controls */}
            <div className="space-y-3">
              {!gameStarted ? (
                <button
                  onClick={startGame}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg font-semibold hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 whitespace-nowrap"
                >
                  <i className="ri-play-line mr-2"></i>
                  Start Game
                </button>
              ) : (
                <>
                  <button
                    onClick={togglePause}
                    className="w-full px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 whitespace-nowrap"
                  >
                    <i className={`${isPaused ? 'ri-play-line' : 'ri-pause-line'} mr-2`}></i>
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                  <button
                    onClick={startGame}
                    className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg font-semibold hover:from-red-500 hover:to-pink-500 transition-all duration-300 whitespace-nowrap"
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