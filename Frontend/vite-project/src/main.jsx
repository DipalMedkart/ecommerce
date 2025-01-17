// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import App from './App.jsx'
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
import OrdersPage from "./pages/user-pages/OrdersPage";
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './component/ProtectedRoute.jsx';
import HomePage from './pages/public/HomePage.jsx';




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>

      <Router>
        <Routes>
          {/*}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
           <Route path="/admin-dashboard" element={<AdminPage />} /> 
           <Route path="/customer-dashboard" element={<CustomerDashboard />} /> 
          <Route path="/customer-dashboard/orders" element={<OrdersPage />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/admin-dashboard/add-product" element={<AddProduct />} />
          <Route path="/admin-dashboard/product-details" element={<AdminProducts />} />
          <Route path="/admin-dashboard/manage-users" element={<ManageUsers />} />
          <Route path="/admin-dashboard/manage-orders" element={<ManageOrders />} />
          <Route path="/customer-navbar" element={<CustomerNavbar />} /> */}

          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="Admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customer-dashboard"
            element={
              <ProtectedRoute requiredRole="Customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />


          <Route
            path="/customer-dashboard/orders"
            element={
              <ProtectedRoute requiredRole="Customer">
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/add-product"
            element={
              <ProtectedRoute requiredRole="Admin">
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/product-details"
            element={
              <ProtectedRoute requiredRole="Admin">
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/manage-orders"
            element={
              <ProtectedRoute requiredRole="Admin">
                <ManageOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/manage-users"
            element={
              <ProtectedRoute requiredRole="Admin">
                <ManageUsers />
              </ProtectedRoute>
            }
          />

        </Routes>

      </Router>
    </AuthProvider>
  </React.StrictMode>


  // <React.StrictMode>
  //   <AuthProvider>
  //     <Router>
  //       <App />
  //     </Router>
  //   </AuthProvider>
  // </React.StrictMode>
);
