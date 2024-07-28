import React from "react";
import { useNavigate } from "react-router-dom";

const Result = ({ score, total }) => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="result-container">
      <h2 className="result-header">Quiz Finished</h2>
      <p className="result-score">
        Your Score: {score}/{total}
      </p>
      <button className="back-home-button" onClick={handleBackHome}>
        Back Home
      </button>
    </div>
  );
};

export default Result;
