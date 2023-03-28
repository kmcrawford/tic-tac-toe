import React, { useState, useEffect } from "react";
import "./App.css";
import classNames from "classnames";
import Confetti from "react-confetti";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [difficulty, setDifficulty] = useState(0.5);

  function handleDifficultyChange(e) {
    setDifficulty(e.target.value);
  }


  function checkWinner(board) {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function minimax(board, depth, isMaximizing) {
    const winner = checkWinner(board);

    if (winner === "X") {
      return -1;
    } else if (winner === "O") {
      return 1;
    } else if (board.every((cell) => cell !== null)) {
      return 0;
    }

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          const newBoard = board.slice();
          newBoard[i] = "O";
          const evaluation = minimax(newBoard, depth + 1, false);
          maxEval = Math.max(maxEval, evaluation);
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          const newBoard = board.slice();
          newBoard[i] = "X";
          const evaluation = minimax(newBoard, depth + 1, true);
          minEval = Math.min(minEval, evaluation);
        }
      }
      return minEval;
    }
  }

  function findBestMove(board) {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = board.slice();
        newBoard[i] = "O";
        const score = minimax(newBoard, 0, false);
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  }

  function computerMove() {
    if (Math.random() > parseFloat(difficulty)) {
      let availableMoves = [];
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          availableMoves.push(i);
        }
      }
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else {
      return findBestMove(board);
    }
  }



  function handleClick(i) {
    if (board[i] !== null || gameOver || !playerTurn) {
      return;
    }

    const newBoard = board.slice();
    newBoard[i] = "X";
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setGameOver(true);
      setWinner(winner);
      return;
    }

    if (newBoard.every((cell) => cell !== null)) {
      setGameOver(true);
      return;
    }

    setPlayerTurn(false);
  }

  useEffect(() => {
    if (!playerTurn && !gameOver) {
      const handleComputerMove = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const move = computerMove();
        if (move !== undefined && board[move] === null) {
          const updatedBoard = board.slice();
          updatedBoard[move] = "O";
          setBoard(updatedBoard);

          const winner = checkWinner(updatedBoard);
          if (winner) {
            setGameOver(true);
            setWinner(winner);
            return;
          }
        }

        if (board.every((cell) => cell !== null)) {
          setGameOver(true);
        } else {
          setPlayerTurn(true);
        }
      };

      handleComputerMove();
    }
  }, [playerTurn, gameOver, board]);

  function renderSquare(i) {
    return (
        <button key={i} className="square" onClick={() => handleClick(i)}>
          {board[i]}
        </button>
    );
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setPlayerTurn(true);
    setGameOver(false);
    setWinner(null);
  }

  const boardClass = classNames("board", {
    "board--red-blink": gameOver && winner === "O",
  });

  return (
      <div className="App">
        <h1>Tic-Tac-Toe</h1>
        <div className="slider-container">
          <label htmlFor="difficulty">Difficulty: </label>
          <input
              type="range"
              id="difficulty"
              name="difficulty"
              min="0"
              max="1"
              step="0.01"
              value={difficulty}
              onChange={handleDifficultyChange}
          />
        </div>
        {gameOver && winner === "X" && <Confetti />}
        <div className={boardClass}>
          {Array(9)
              .fill(null)
              .map((_, i) => renderSquare(i))}

        </div>
        <div className="game-info">
          {gameOver ? (
              <div>
                <h2>
                  {winner === "X"
                      ? "Congratulations! You won!"
                      : winner === "O"
                          ? "Computer won! Better luck next time!"
                          : "It's a draw!"}
                </h2>
                <button onClick={resetGame}>Play Again</button>
              </div>
          ) : (
              <h2>Next player: {playerTurn ? "Human (X)" : "Computer (O)"}</h2>
          )}
        </div>
      </div>
  );
}

export default App;