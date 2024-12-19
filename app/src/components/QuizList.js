import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import "../styles/QuizList.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/quizzes`)
      .then((response) => {
        setQuizzes(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1>Select a Quiz</h1>
      {loading && (
        <div className="spinner">
          <ClipLoader size={50} color={"#007BFF"} loading={loading} />
        </div>
      )}
      {!loading && quizzes.length === 0 && <p>No quizzes available.</p>}
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
