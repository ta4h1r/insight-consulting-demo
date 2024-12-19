import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Quiz.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(""); // State for validation error

  useEffect(() => {
    axios.get(`${API_URL}/quizzes/${id}/questions`).then((response) => {
      setQuestions(response.data);
    });
  }, [id]);

  const handleSubmit = () => {
    // Check if all questions have answers
    const allAnswered = questions.every((q) => answers[q.id]);
    if (!allAnswered) {
      setError("Please answer all questions before submitting.");
      return;
    }

    // Clear error and submit answers
    setError("");
    const submittedAnswers = Object.values(answers).map((answer) => ({
      id: answer,
    }));
    axios
      .post(`${API_URL}/submit`, { answers: submittedAnswers })
      .then((response) => {
        navigate("/result", { state: { score: response.data.score } });
      });
  };

  return (
    <div className="container">
      <h1>Quiz</h1>
      <div className="quiz-container">
        {questions.map((q) => (
          <div key={q.id}>
            <p className="question">{q.question}</p>
            <div className="answers">
              {q.answers.map((a) => (
                <label key={a.id} className="answer">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={a.id}
                    onChange={() => setAnswers({ ...answers, [q.id]: a.id })}
                  />
                  {a.answer}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Quiz;
