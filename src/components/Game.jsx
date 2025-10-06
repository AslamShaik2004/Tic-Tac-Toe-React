import React, { useState, useEffect } from "react";
import Board from "./Board";

function Game({ mode, onRestart }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const currentPlayer = xIsNext ? "X" : "O";

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // Check for winner or draw
  useEffect(() => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winPatterns) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes(null) && !winner) {
      setWinner("Draw");
    }
  }, [board, winner]);

  // Simple AI Move (random empty spot)
  useEffect(() => {
    if (mode === "ai" && !xIsNext && !winner) {
      const emptyIndexes = board
        .map((val, i) => (val === null ? i : null))
        .filter((i) => i !== null);

      if (emptyIndexes.length > 0) {
        const randomIndex =
          emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
        const newBoard = [...board];
        newBoard[randomIndex] = "O";
        setTimeout(() => {
          setBoard(newBoard);
          setXIsNext(true);
        }, 500);
      }
    }
  }, [xIsNext, mode, board, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className="game">
      <h2>{mode === "ai" ? "Play with AI" : "Multiplayer Mode"}</h2>
      <Board squares={board} onClick={handleClick} />
      {winner ? (
        <div className="winner">
          {winner === "Draw" ? <p>It's a Draw 🤝</p> : <p>{winner} Wins 🎉</p>}
          <button onClick={resetGame}>Play Again</button>
          <button onClick={onRestart}>Back to Menu</button>
        </div>
      ) : (
        <p>Turn: {currentPlayer}</p>
      )}
    </div>
  );
}

export default Game;
