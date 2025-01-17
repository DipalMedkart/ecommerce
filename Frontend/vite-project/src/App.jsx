import { useState } from 'react';
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
import { Route, Routes } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
     {/*}
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/navbar" element={<Navbar />} />
        <Route path="/customer-navbar" element={<CustomerNavbar />} />

        <Route
          path="/admin-deshboard"
          element={
            <ProtectedRoute requiredRole="Admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-deshboard/add-product"
          element={
            <ProtectedRoute requiredRole="Admin">
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-deshboard/product-details"
          element={
            <ProtectedRoute requiredRole="Admin">
              <AdminProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-deshboard/manage-orders"
          element={
            <ProtectedRoute requiredRole="Admin">
              <ManageOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-deshboard/manage-users"
          element={
            <ProtectedRoute requiredRole="Admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/customer-deshboard"
          element={
            <ProtectedRoute requiredRole="Customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer-deshboard/orders"
          element={
            <ProtectedRoute requiredRole="Customer">
              <OrdersPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      */}
    </>
  )
}

export default App;
