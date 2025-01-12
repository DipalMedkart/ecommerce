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
          <li onClick={() => navigate("/admin-deshboard/delete-product")}>Delete Product</li>
          <li onClick={() => onNavigate("updateProduct")}>Update Product</li>
          <li onClick={() => onNavigate("viewOrders")}>View Orders</li>
          <li onClick={() => onNavigate("manageInventory")}>
            Manage Inventory
          </li>
        </ul>
        <div className="admin-navbar-profile">
          <img
            src="../../public/images/blank-pic.webp" // Replace with the actual profile picture URL
            alt="Profile"
            className="profile-pic"
          />
          <button
            className="logout-button"
            onClick={() => alert("Logging out...")}
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
