import React, { useContext } from "react";
import "../pages/style/AdminNavbar.css";
// import AddProduct from "../pages/product-operation/AddProduct";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminNavbar = ({ onNavigate }) => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAddProductClick = () => {
    // setShowAddProduct(true);
  };

  const handleCloseForm = () => {
    // setShowAddProduct(false);
  };

  const handleLogout = () => {
    

    // localStorage.removeItem("token");
    // localStorage.removeItem("userRole");
    // localStorage.removeItem("role");
    logout();
  
    
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
          
          <li onClick={() => navigate("/admin-dashboard/add-product")}>Add Product</li>
          <li onClick={() => navigate("/admin-dashboard/product-details")}>Product Details</li>
          <li onClick={() => navigate("/admin-dashboard/manage-users")}>Manage Users</li>
          <li onClick={() => navigate("/admin-dashboard/manage-orders")}>Manage Orders</li>
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
