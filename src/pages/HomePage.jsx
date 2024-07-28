import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <div className="home-container">
      <h1 className="home-header">Welcome to the Quiz App</h1>
      <button className="home-logout-button" onClick={handleLogout}>
        Logout
      </button>
      <Link to="/quiz" className="home-start-quiz">
        Start Quiz
      </Link>
    </div>
  );
};

export default Home;
