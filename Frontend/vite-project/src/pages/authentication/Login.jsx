import React, { useState } from "react";
import "../style/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log("Email:", email, "Password:", password);

    try {
      const response = await axios("http://localhost:5000/login", {
        email,
        password,
      });

      setMessage("Login successful!");
      const { token, role } = response.data;

      // Store token in localstore for future use
      localStorage.setItem("authToken", token);

      // navigating to dashboard after login sucessfull depend on role
      if (role === "Admin") {
        navigate("/admin-deshboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      // Handle error response here
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <p className="switch-text">
        Don't have an account?{" "}
        <span className="switch-link" onClick={() => navigate("/signup")}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
