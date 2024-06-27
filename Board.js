
import React, { useState, useEffect } from 'react';
import Square from './Square';
import './Board.css';

const Board = ({ isSinglePlayer }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    if (isSinglePlayer && !xIsNext) {
      const emptySquares = squares
        .map((square, index) => (square === null ? index : null))
        .filter((val) => val !== null);
      const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      if (randomMove !== undefined) {
        handleClick(randomMove);
      }
    }
  }, [xIsNext, squares, isSinglePlayer]);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(squares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(square => square !== null);
  const status = winner ? `Winner: ${winner}` : isBoardFull ? 'Game Over' : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="reset-button" onClick={resetGame}>Reset</button>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Board;
