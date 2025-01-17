import React, { useState } from "react";
import "../style/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const {login} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log("Email:", email, "Password:", password);

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      setMessage("Login successful!");
      // const { token, role } = response.data;

      const token = response.data.token;
      const role = response.data.user.role;
      console.log(role);
      login(token,role);

      // Store token in localstore for future use
      // localStorage.setItem("token", token);
      // localStorage.setItem("userRole", role);
      // setUserRole(role);
      // setIsAuthenticated(true);

     
      if (role === "Admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/customer-dashboard");
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
