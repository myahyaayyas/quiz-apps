import React, { useMemo, useState } from "react";

const Question = ({ data, onAnswer }) => {
  const { question, correct_answer, incorrect_answers } = data;
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const answers = useMemo(
    () => [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5),
    [data]
  );

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === correct_answer;
    onAnswer(isCorrect);
  };

  return (
    <div className="question-container">
      <h2 className="question-header">{question}</h2>
      <ul className="answers-list">
        {answers.map((answer, index) => (
          <li
            key={index}
            className={`answer-item ${selectedAnswer === answer ? "selected" : ""}`}
            onClick={() => handleAnswer(answer)}
          >
            {answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
