import React from "react";
import "../styles/Scoreboard.css";

function Scoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <p>
        Score: <span>{score}</span>
      </p>
      <p>
        Best Score: <span>{bestScore}</span>
      </p>
    </div>
  );
}

export default Scoreboard;
