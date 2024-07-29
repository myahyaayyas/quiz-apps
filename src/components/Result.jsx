import React from "react";
import { useNavigate } from "react-router-dom";

const Result = ({ score, total }) => {
  const navigate = useNavigate();

  const finalScore = total > 0 ? Math.round((score / total) * 100) : 0;

  const handleBackHome = () => {
    navigate("/");
    localStorage.removeItem("quizState");
  };

  return (
    <div className="result-container">
      <h2 className="result-header">Quiz Finished</h2>
      <p className="result-score">
        Your Score: {finalScore}% ({score}/{total})
      </p>
      <button className="back-home-button" onClick={handleBackHome}>
        Back Home
      </button>
    </div>
  );
};

export default Result;
