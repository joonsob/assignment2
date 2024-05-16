// App.js
import React, { useState } from 'react';
import styles from './App.module.css';

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

const Square = ({ value, onClick }) => {
  return (
    <button className={styles.square} onClick={onClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div>
      <div className={styles.boardRow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const App = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(false); // Set xIsNext to false

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const squares = current.squares.slice();
    if (winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares: squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const player = move % 2 === 0 ? 'X' : 'O';
    const position = step.squares.indexOf(player);
    if (position === -1) {
      return null;
    }
    return (
      <li key={move}>
        {player}: ({Math.floor(position / 3)}, {position % 3})
      </li>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className={styles.game}>
      <div className={styles.gameBoard}>
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className={styles.gameInfo}>
        <div>{status}</div>
        <div>
          <div>Player X:</div>
          <ol>{moves.filter((move, index) => index % 2 === 0)}</ol>
        </div>
        <div>
          <div>Player O:</div>
          <ol>{moves.filter((move, index) => index % 2 !== 0)}</ol>
        </div>
      </div>
    </div>
  );
};

export default App;
