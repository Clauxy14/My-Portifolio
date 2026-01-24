import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

interface HeaderProps {
  darkMode?: boolean;
  setDarkMode?: (mode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  darkMode: propDarkMode,
  setDarkMode: propSetDarkMode,
}) => {
  const [localDarkMode, setLocalDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const darkMode = propDarkMode !== undefined ? propDarkMode : localDarkMode;
  const setDarkMode = propSetDarkMode || setLocalDarkMode;

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">Your Name</div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/chatbot">Chatbot</Link>
          </li>
        </ul>
        <button
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </nav>
    </header>
  );
};

export default Header;
