import React, { useState, useEffect } from "react";
import { fetchQuestions } from "../utils/network-data";
import Quiz from "../components/Quiz";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      const questionsData = await fetchQuestions();
      setQuestions(questionsData);
      setIsLoading(false);
    };
    loadQuestions();
  }, []);

  return <div>{isLoading ? <p>Loading...</p> : <Quiz questions={questions} />}</div>;
};

export default QuizPage;
