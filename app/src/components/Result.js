import React from "react";
import { useLocation, Link } from "react-router-dom";

function Result() {
  const { state } = useLocation();
  return (
    <div>
      <h1>Your Score: {state.score}</h1>
      <Link to="/">Back to Quiz List</Link>
    </div>
  );
}

export default Result;
