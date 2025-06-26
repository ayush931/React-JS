import { useState } from "react";
import Card from "../Card/Card";
import "./Grid.css";
import isWinner from "../../helpers/checkWinners";

function Grid({ numberOfCards }) {
  const [board, setBoard] = useState(Array(numberOfCards).fill(""));
  const [turn, setTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  function play(index) {
    if (turn === true) {
      board[index] = "O";
    } else {
      board[index] = "X";
    }

    const winner = isWinner(board, turn ? "O" : "X");
    if (winner) {
      setWinner(winner);
    }
    setBoard([...board]);
    setTurn(!turn);
  }

  function reset() {
    setBoard(Array(numberOfCards).fill(""));
    setTurn(true);
    setWinner(null);
  }
  return (
    <div className="grid-wrapper">
      {winner && (
        <>
          <div className="turn-highlight">Winner is: {winner}</div>
          <button className="reset" onClick={() => reset()}>Reset Game</button>
        </>
      )}
      <h1 className="turn-highlight">Current turn: {turn ? "O" : "X"}</h1>
      <div className="grid">
        {board.map((element, index) => (
          <Card key={index} gameEnd={winner ? true : false} onPlay={play} player={element} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Grid;
