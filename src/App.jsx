import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArsipPage from "./pages/ArsipPage";
import DetailNotePage from "./pages/DetailNotePage";
import AddPage from "./pages/AddPage";

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>
          <Link to="/">Note App</Link>
        </h1>
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/arsip">Arsip</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/arsip" element={<ArsipPage />} />
          <Route path="/note/:id" element={<DetailNotePage />} />
          <Route path="/note/add" element={<AddPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
