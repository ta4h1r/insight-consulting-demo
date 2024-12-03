import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios
      .get(`http://192.168.1.101:3001/quizzes/${id}/questions`)
      .then((response) => {
        setQuestions(response.data);
      });
  }, [id]);

  const handleSubmit = () => {
    const submittedAnswers = Object.values(answers).map((answer) => ({
      id: answer,
    }));
    axios
      .post("http://192.168.1.101:3001/submit", { answers: submittedAnswers })
      .then((response) => {
        navigate("/result", { state: { score: response.data.score } });
      });
  };

  return (
    <div>
      <h1>Quiz</h1>
      {questions.map((q) => (
        <div key={q.id}>
          <h2>{q.question}</h2>
          {q.answers.map((a) => (
            <div key={a.id}>
              <input
                type="radio"
                name={`question-${q.id}`}
                value={a.id}
                onChange={() => setAnswers({ ...answers, [q.id]: a.id })}
              />
              {a.answer}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Quiz;
