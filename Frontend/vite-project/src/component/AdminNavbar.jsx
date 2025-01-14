import React from "react";
import "../pages/style/AdminNavbar.css";
// import AddProduct from "../pages/product-operation/AddProduct";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = ({ onNavigate }) => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  const navigate = useNavigate();
  const handleAddProductClick = () => {
    // setShowAddProduct(true);
  };

  const handleCloseForm = () => {
    // setShowAddProduct(false);
  };

  const handleLogout = () => {
    

    localStorage.removeItem("token");
    localStorage.removeItem("role");
  
    
    window.location.href = "/login";
  };

  return (
    <>
      <nav className="admin-navbar">
        <div className="admin-navbar-left">
          <h2>Admin Panel</h2>
        </div>
        <ul className="admin-navbar-links">
          {/* <li
            onClick={() => {
              handleAddProductClick;
            }}
          >
            Add Product
          </li> */}
          {/* <li onClick={() => onNavigate("deleteProduct")}>Delete Product</li> */}
          
          <li onClick={() => navigate("/admin-deshboard/add-product")}>Add Product</li>
          <li onClick={() => navigate("/admin-deshboard/product-details")}>Product Details</li>
          <li onClick={() => navigate("/admin-deshboard/manage-users")}>Manage Users</li>
          <li onClick={() => navigate("/admin-deshboard/manage-orders")}>Manage Orders</li>
          {/* <li onClick={() => onNavigate("updateProduct")}>Update Product</li> */}
          {/* <li onClick={() => onNavigate("viewOrders")}>View Orders</li> */}
          <li onClick={() => onNavigate("manageInventory")}>
            Manage Inventory
          </li>
        </ul>
        <div className="admin-navbar-profile">
          <img
            src="../../public/images/blank-pic.webp" 
            alt="Profile"
            className="profile-pic"
          />
          <button
            className="logout-button"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* {showAddProduct && <AddProduct onClose={handleCloseForm} />} */}
    </>
  );
};

export default AdminNavbar;
