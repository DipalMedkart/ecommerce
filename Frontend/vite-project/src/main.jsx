// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/Login";  
import Signup from "./pages/authentication/Signup"; 
import Home from "./pages/public/Home"; 
import AdminPage from "./pages/public/AdminPage";
import Navbar from "./component/Navbar";
import AddProduct from "./pages/product-operation/AddProduct";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Define different routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-deshboard" element={<AdminPage />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/admin/addproduct" element={<AddProduct/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
