import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/QuizList.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/quizzes`).then((response) => {
      setQuizzes(response.data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Select a Quiz</h1>
      <div className="quiz-list">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-item">
            <span>{quiz.name}</span>
            <Link to={`/quiz/${quiz.id}`}>
              <button>Start</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;
