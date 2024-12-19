import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizList from "./components/QuizList";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
