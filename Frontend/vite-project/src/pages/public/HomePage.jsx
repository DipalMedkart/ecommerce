import React from "react";
import "../style/Home.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  
 

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
  
    navigate("/signup");
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <img 
          src="C:\E-commerce\images\homepage.jpg" 
          alt="Main Banner" 
          className="hero-image"
        />
        <h1>Welcome to Our Website</h1>
        <p>Your gateway to amazing features and services!</p>
      </header>

      <main className="homepage-main">
        <div className="auth-buttons">
          { true ? (
            <>
              <button className="signin-button" onClick={handleLogin}>
                Log In
              </button>
              <button className="signup-button" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </>
          ) : (
            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          )}
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
