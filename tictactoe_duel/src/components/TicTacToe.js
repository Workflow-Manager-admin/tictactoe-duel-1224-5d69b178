import React, { useState, useCallback } from 'react';
import './styles/TicTacToe.css';

// PUBLIC_INTERFACE
const TicTacToe = () => {
  // Initialize game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningCells, setWinningCells] = useState([]);

  // Winning combinations on the board
  const winningCombos = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal left to right
    [2, 4, 6]  // Diagonal right to left
  ];

  /**
   * Check if there's a winner based on the current board state
   * @param {Array} boardState - Current state of the game board
   * @returns {Array|null} Array of winning indices or null if no winner
   */
  const calculateWinner = useCallback((boardState) => {
    for (const [a, b, c] of winningCombos) {
      if (boardState[a] && 
          boardState[a] === boardState[b] && 
          boardState[a] === boardState[c]) {
        return [a, b, c];
      }
    }
    return null;
  }, []);

  /**
   * Handle cell click event
   * @param {number} index - Index of the clicked cell
   */
  const handleCellClick = useCallback((index) => {
    // If cell is already filled or there's a winner, ignore the click
    if (board[index] || winningCells.length > 0) return;

    // Create new board state
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    
    // Check for winner
    const winner = calculateWinner(newBoard);
    if (winner) {
      setWinningCells(winner);
    }

    // Update game state
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }, [board, isXNext, winningCells.length, calculateWinner]);

  /**
   * Reset the game to initial state
   */
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningCells([]);
  }, []);

  // Determine game status message
  const getGameStatus = useCallback(() => {
    if (winningCells.length > 0) {
      return `Winner: ${board[winningCells[0]]}`;
    } else if (board.every(cell => cell !== null)) {
      return "Game Draw!";
    } else {
      return `Next Player: ${isXNext ? 'X' : 'O'}`;
    }
  }, [board, winningCells, isXNext]);

  return (
    <div className="tictactoe-container">
      <h2>TicTacToe Duel</h2>
      
      <div className="game-status">
        {getGameStatus()}
      </div>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${winningCells.includes(index) ? 'winner' : ''}`}
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <button 
        className="btn reset-button" 
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
