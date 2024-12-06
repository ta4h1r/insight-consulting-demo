import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:3001";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/quizzes`).then((response) => {
      setQuizzes(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Select a Quiz</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <Link to={`/quiz/${quiz.id}`}>{quiz.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizList;
