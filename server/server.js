const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});

// Get all quizzes
app.get("/api/quizzes", (req, res) => {
  const query = "SELECT * FROM quizzes";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get questions for a quiz
app.get("/api/quizzes/:id/questions", (req, res) => {
  const quizId = req.params.id;
  const query = `
        SELECT q.id AS questionId, q.question, a.id AS answerId, a.answer, a.is_correct 
        FROM questions q 
        JOIN answers a ON q.id = a.question_id 
        WHERE q.quiz_id = ?
    `;
  db.query(query, [quizId], (err, results) => {
    if (err) throw err;
    const grouped = results.reduce((acc, cur) => {
      const { questionId, question, answerId, answer, is_correct } = cur;
      acc[questionId] = acc[questionId] || {
        id: questionId,
        question,
        answers: [],
      };
      acc[questionId].answers.push({
        id: answerId,
        answer,
        isCorrect: is_correct,
      });
      return acc;
    }, {});
    res.json(Object.values(grouped));
  });
});

// Submit answers and calculate score
app.post("/api/submit", (req, res) => {
  const { answers } = req.body;

  // Validate answers exist
  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid answers format" });
  }

  // Query database for the correct answers
  const query = "SELECT id, is_correct FROM answers WHERE id IN (?)";
  db.query(query, [answers.map((a) => a.id)], (err, results) => {
    if (err) throw err;

    // Check for missing questions
    const submittedAnswerIds = answers.map((a) => a.id);
    const resultIds = results.map((r) => r.id);

    const missingAnswers = submittedAnswerIds.filter(
      (id) => !resultIds.includes(id),
    );
    if (missingAnswers.length > 0) {
      return res
        .status(400)
        .json({ error: "Some answers are invalid or missing" });
    }

    // Calculate the score
    const score = results.filter((a) => a.is_correct).length;
    res.json({ score });
  });
});

// Start server
app.listen(3001, () => console.log("Server running"));
