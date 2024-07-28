import React, { useState, useEffect } from "react";
import Question from "./Question";
import Result from "./Result";

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsQuizFinished(true);
    }

    const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  const handleSubmit = () => {
    setIsQuizFinished(true);
  };

  if (isQuizFinished) {
    return (
      <div className="result-container">
        <Result score={score} total={questions.length} />
        <button className="back-home-button" onClick={() => (window.location.href = "/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="sidebar">
        <div className="question-numbers">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`question-number ${index === currentQuestionIndex ? "active" : ""}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="main-content">
        <p className="timer">Time left: {timeLeft}s</p>
        <div className="question-container">
          <Question data={questions[currentQuestionIndex]} onAnswer={handleAnswer} />
          {currentQuestionIndex === questions.length - 1 && (
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
