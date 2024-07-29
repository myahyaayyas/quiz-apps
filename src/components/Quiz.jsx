import React, { useState, useEffect } from "react";
import Question from "./Question";
import Result from "./Result";

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("quizState"));
    if (savedState) {
      setCurrentQuestionIndex(savedState.currentQuestionIndex);
      setScore(savedState.score);
      setCorrectAnswers(savedState.correctAnswers);
      setIncorrectAnswers(savedState.incorrectAnswers);
      setIsQuizFinished(savedState.isQuizFinished);
      setTimeLeft(savedState.timeLeft);
    }
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      console.log("Time is up. Calling handleSubmit...");
      handleSubmit();
    } else {
      const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!isQuizFinished) {
      const quizState = {
        currentQuestionIndex,
        score,
        correctAnswers,
        incorrectAnswers,
        isQuizFinished,
        timeLeft,
      };
      localStorage.setItem("quizState", JSON.stringify(quizState));
    }
  }, [currentQuestionIndex, score, correctAnswers, incorrectAnswers, isQuizFinished, timeLeft]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting the quiz. Removing quizState from localStorage.");
    try {
      localStorage.removeItem("quizState");
      console.log("LocalStorage after removal:", localStorage.getItem("quizState")); // Check if localStorage is actually empty
      setIsQuizFinished(true);
    } catch (error) {
      console.error("Error removing quizState from localStorage:", error);
    }
  };

  if (isQuizFinished) {
    return (
      <Result
        score={score}
        total={questions.length}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
      />
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
