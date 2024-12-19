import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/Result.css";

function Result() {
  const { state } = useLocation();
  return (
    <div className="container result-container">
      <h1>Quiz Completed</h1>
      <p className="result-score">Your Score: {state.score}</p>
      <Link to="/" className="back-link">
        Back to Quiz List
      </Link>
    </div>
  );
}

export default Result;
