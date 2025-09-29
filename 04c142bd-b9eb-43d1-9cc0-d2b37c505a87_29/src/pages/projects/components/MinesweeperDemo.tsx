import { useState, useEffect, useCallback } from 'react';

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborCount: number;
}

const DIFFICULTIES = {
  beginner: { rows: 9, cols: 9, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert: { rows: 16, cols: 30, mines: 99 }
};

export default function MinesweeperDemo() {
  const [difficulty, setDifficulty] = useState('beginner');
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameState, setGameState] = useState('ready'); // ready, playing, won, lost
  const [mineCount, setMineCount] = useState(DIFFICULTIES.beginner.mines);
  const [flagCount, setFlagCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [firstClick, setFirstClick] = useState(true);

  const { rows, cols, mines } = DIFFICULTIES[difficulty as keyof typeof DIFFICULTIES];

  const createEmptyBoard = useCallback(() => {
    return Array(rows).fill(null).map(() =>
      Array(cols).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborCount: 0
      }))
    );
  }, [rows, cols]);

  const placeMines = useCallback((board: Cell[][], excludeRow: number, excludeCol: number) => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    let minesPlaced = 0;

    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);

      if (!newBoard[row][col].isMine && !(row === excludeRow && col === excludeCol)) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor counts
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const newRow = row + dr;
              const newCol = col + dc;
              if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                newBoard[newRow][newCol].isMine
              ) {
                count++;
              }
            }
          }
          newBoard[row][col].neighborCount = count;
        }
      }
    }

    return newBoard;
  }, [rows, cols, mines]);

  const revealCell = useCallback((board: Cell[][], row: number, col: number): Cell[][] => {
    if (row < 0 || row >= rows || col < 0 || col >= cols || board[row][col].isRevealed || board[row][col].isFlagged) {
      return board;
    }

    const newBoard = board.map(r => r.map(c => ({ ...c })));
    newBoard[row][col].isRevealed = true;

    // If it's an empty cell, reveal neighbors
    if (newBoard[row][col].neighborCount === 0 && !newBoard[row][col].isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          revealCell(newBoard, row + dr, col + dc);
        }
      }
    }

    return newBoard;
  }, [rows, cols]);

  const handleCellClick = (row: number, col: number) => {
    if (gameState === 'won' || gameState === 'lost') return;

    let newBoard = [...board];

    if (firstClick) {
      newBoard = placeMines(createEmptyBoard(), row, col);
      setFirstClick(false);
      setGameState('playing');
    }

    if (newBoard[row][col].isFlagged || newBoard[row][col].isRevealed) return;

    if (newBoard[row][col].isMine) {
      // Game over - reveal all mines
      newBoard = newBoard.map(r => r.map(c => ({
        ...c,
        isRevealed: c.isMine ? true : c.isRevealed
      })));
      setGameState('lost');
    } else {
      newBoard = revealCell(newBoard, row, col);
      
      // Check win condition
      const revealedCount = newBoard.flat().filter(cell => cell.isRevealed).length;
      if (revealedCount === rows * cols - mines) {
        setGameState('won');
      }
    }

    setBoard(newBoard);
  };

  const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameState === 'won' || gameState === 'lost' || board[row][col].isRevealed) return;

    const newBoard = board.map(r => r.map(c => ({ ...c })));
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    
    setBoard(newBoard);
    setFlagCount(prev => newBoard[row][col].isFlagged ? prev + 1 : prev - 1);
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setGameState('ready');
    setMineCount(mines);
    setFlagCount(0);
    setTimer(0);
    setFirstClick(true);
  };

  const changeDifficulty = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
    setMineCount(DIFFICULTIES[newDifficulty as keyof typeof DIFFICULTIES].mines);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  // Initialize board
  useEffect(() => {
    resetGame();
  }, [difficulty, createEmptyBoard]);

  const getCellContent = (cell: Cell, row: number, col: number) => {
    if (cell.isFlagged) {
      return <i className="ri-flag-fill text-red-400"></i>;
    }
    
    if (!cell.isRevealed) {
      return '';
    }
    
    if (cell.isMine) {
      return <i className="ri-bomb-line text-red-500"></i>;
    }
    
    if (cell.neighborCount > 0) {
      return cell.neighborCount;
    }
    
    return '';
  };

  const getCellClass = (cell: Cell) => {
    let baseClass = "w-8 h-8 border border-gray-600 flex items-center justify-center text-sm font-bold cursor-pointer transition-all duration-200 ";
    
    if (cell.isRevealed) {
      if (cell.isMine) {
        baseClass += "bg-red-600 text-white ";
      } else {
        baseClass += "bg-gray-300 text-gray-800 ";
        // Color based on neighbor count
        if (cell.neighborCount === 1) baseClass += "text-blue-600 ";
        else if (cell.neighborCount === 2) baseClass += "text-green-600 ";
        else if (cell.neighborCount === 3) baseClass += "text-red-600 ";
        else if (cell.neighborCount === 4) baseClass += "text-purple-600 ";
        else if (cell.neighborCount === 5) baseClass += "text-yellow-600 ";
        else if (cell.neighborCount === 6) baseClass += "text-pink-600 ";
        else if (cell.neighborCount === 7) baseClass += "text-black ";
        else if (cell.neighborCount === 8) baseClass += "text-gray-600 ";
      }
    } else {
      baseClass += "bg-gray-500 hover:bg-gray-400 ";
    }
    
    return baseClass;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
            Minimal Minesweeper
          </h1>
          <p className="text-gray-300">Classic mine detection puzzle game</p>
        </div>

        <div className="flex justify-center items-start gap-8">
          {/* Game Board */}
          <div className="bg-black/30 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6">
            <div className="bg-gray-200 p-4 rounded-lg inline-block">
              <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {board.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={getCellClass(cell)}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
                    >
                      {getCellContent(cell, rowIndex, colIndex)}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Game Status */}
            {gameState === 'won' && (
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">
                  <i className="ri-trophy-line mr-2"></i>
                  You Won!
                </div>
                <p className="text-gray-300">Time: {timer}s</p>
              </div>
            )}

            {gameState === 'lost' && (
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold text-red-400 mb-2">
                  <i className="ri-bomb-line mr-2"></i>
                  Game Over!
                </div>
                <p className="text-gray-300">Better luck next time!</p>
              </div>
            )}
          </div>

          {/* Game Info */}
          <div className="space-y-6">
            {/* Game Stats */}
            <div className="bg-black/30 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 min-w-[200px]">
              <h3 className="text-lg font-bold mb-4 text-green-300">Game Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Mines:</span>
                  <span className="text-white font-bold">{mineCount - flagCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Flags:</span>
                  <span className="text-white font-bold">{flagCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-white font-bold">{timer}s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className={`font-bold ${
                    gameState === 'won' ? 'text-green-400' :
                    gameState === 'lost' ? 'text-red-400' :
                    gameState === 'playing' ? 'text-yellow-400' : 'text-gray-400'
                  }`}>
                    {gameState === 'ready' ? 'Ready' :
                     gameState === 'playing' ? 'Playing' :
                     gameState === 'won' ? 'Won' : 'Lost'}
                  </span>
                </div>
              </div>
            </div>

            {/* Difficulty */}
            <div className="bg-black/30 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 text-green-300">Difficulty</h3>
              <div className="space-y-2">
                {Object.entries(DIFFICULTIES).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => changeDifficulty(key)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      difficulty === key
                        ? 'bg-green-500/30 border border-green-400'
                        : 'bg-gray-800/50 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="capitalize font-medium">{key}</span>
                      <span className="text-sm text-gray-400">
                        {config.rows}×{config.cols} ({config.mines} mines)
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-black/30 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 text-green-300">Controls</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Reveal:</span>
                  <span className="text-white">Left Click</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Flag:</span>
                  <span className="text-white">Right Click</span>
                </div>
              </div>
            </div>

            {/* Game Controls */}
            <div className="space-y-3">
              <button
                onClick={resetGame}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg font-semibold hover:from-green-500 hover:to-teal-500 transition-all duration-300 whitespace-nowrap"
              >
                <i className="ri-restart-line mr-2"></i>
                New Game
              </button>
            </div>

            {/* Tips */}
            <div className="bg-black/30 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 text-green-300">Tips</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start space-x-2">
                  <i className="ri-lightbulb-line text-yellow-400 mt-1"></i>
                  <span>Numbers show how many mines are adjacent</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="ri-lightbulb-line text-yellow-400 mt-1"></i>
                  <span>Right-click to flag suspected mines</span>
                </div>
                <div className="flex items-start space-x-2">
                  <i className="ri-lightbulb-line text-yellow-400 mt-1"></i>
                  <span>Start with corners and edges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}