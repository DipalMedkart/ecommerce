import React from "react";
import "../style/Home.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Our Website</h1>
        <p>Your gateway to amazing features and services!</p>
      </header>

      <main className="homepage-main">
        <div className="auth-buttons">
          <button className="signup-button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
          <button className="signin-button" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </main>

      <footer className="homepage-footer">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
