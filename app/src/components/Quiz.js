import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import "../styles/Quiz.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/quizzes/${id}/questions`)
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to load questions. Please try again.");
      });
  }, [id]);

  const handleSubmit = () => {
    // Check if all questions have answers
    const allAnswered = questions.every((q) => answers[q.id]);
    if (!allAnswered) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    const submittedAnswers = Object.values(answers).map((answer) => ({
      id: answer,
    }));
    axios
      .post(`${API_URL}/api/submit`, { answers: submittedAnswers })
      .then((response) => {
        navigate("/result", { state: { score: response.data.score } });
      });
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1>Quiz</h1>
      <div className="quiz-container">
        {loading ? (
          <div className="spinner">
            <ClipLoader size={50} color={"#007BFF"} loading={loading} />
          </div>
        ) : (
          <>
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
                        onChange={() =>
                          setAnswers({ ...answers, [q.id]: a.id })
                        }
                      />
                      {a.answer}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
