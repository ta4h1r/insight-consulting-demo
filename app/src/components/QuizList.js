import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.1.101:3001/quizzes").then((response) => {
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
