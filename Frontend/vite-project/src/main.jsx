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
import DeleteProducts from "./pages/product-operation/DeleteProduct";
import CustomerDashboard from "./pages/public/CustomerDeshboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Define different routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-deshboard" element={<AdminPage />} />
        <Route path="/customer-deshboard" element={<CustomerDashboard />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/admin-deshboard/add-product" element={<AddProduct/>} />
        <Route path="/admin-deshboard/delete-product" element={<DeleteProducts/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
