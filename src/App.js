import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Dashboard from "./components/Dashboard.jsx";
import SignUp from "./components/SignUp.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import Home from "./components/Home.jsx";

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // נבדוק אם יש שינוי במצב האימות בכל פעם שהרכיב נטען
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    // מאזינים לשינויים ב-localStorage
    window.addEventListener("storage", handleStorageChange);

    // ניקוי של מאזין האירועים
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!isAuthenticated && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {!isAuthenticated && (
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
          <Link to="/about">About</Link>
          {isAuthenticated && (
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          )}
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
