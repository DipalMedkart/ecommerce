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
import AdminProducts from "./pages/product-operation/AdminProducts";
import CustomerDashboard from "./pages/public/CustomerDeshboard";
import CustomerNavbar from "./component/CustomerNavbar"
import ManageOrders from "./pages/Admin-operations/ManageOrders";
import ManageUsers from "./pages/Admin-operations/ManageUsers";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-deshboard" element={<AdminPage />} />
        <Route path="/customer-deshboard" element={<CustomerDashboard />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/admin-deshboard/add-product" element={<AddProduct/>} />
        <Route path="/admin-deshboard/product-details" element={<AdminProducts/>} />
        <Route path="/admin-deshboard/manage-users" element={<ManageUsers/>} />
        <Route path="/admin-deshboard/manage-orders" element={<ManageOrders/>} />
        <Route path="/customer-navbar" element={<CustomerNavbar/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
