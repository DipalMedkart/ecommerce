import React, { useState } from "react";
import "../style/AddProduct.css";
import { useNavigate } from "react-router-dom";


const AddProduct = ({ onClose }) => {

  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    product_name: "",
    ws_code: "",
    sales_price: "",
    mrp: "",
    package_size: "",
    images: "",
    tags: "",
    category_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      product_name: productData.product_name,
      ws_code: productData.ws_code ? parseInt(productData.ws_code) : null,
      sales_price: parseInt(productData.sales_price),
      mrp: parseInt(productData.mrp),
      package_size: parseInt(productData.package_size),
      images: productData.images ? productData.images.split(",") : [], // Split string into array
      tags: productData.tags ? productData.tags.split(",") : [], // Split string into array
      category_id: productData.category_id
        ? parseInt(productData.category_id)
        : null,
    };

    try {
      const response = await fetch("http://localhost:5000/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add authentication token
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message); // Show success message
        onClose(); // Close the form
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };

  return (
    <div className="add-product-container">
      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2>Add Product</h2>
        <label>
          Product Name:
          <input
            type="text"
            name="product_name"
            value={productData.product_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          WS Code:
          <input
            type="number"
            name="ws_code"
            value={productData.ws_code}
            onChange={handleChange}
          />
        </label>
        <label>
          Sales Price:
          <input
            type="number"
            name="sales_price"
            value={productData.sales_price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          MRP:
          <input
            type="number"
            name="mrp"
            value={productData.mrp}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Package Size:
          <input
            type="number"
            name="package_size"
            value={productData.package_size}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Images (Comma-separated URLs):
          <input
            type="text"
            name="images"
            value={productData.images}
            onChange={handleChange}
          />
        </label>
        <label>
          Tags (Comma-separated):
          <input
            type="text"
            name="tags"
            value={productData.tags}
            onChange={handleChange}
          />
        </label>
        <label>
          Category ID:
          <input
            type="number"
            name="category_id"
            value={productData.category_id}
            onChange={handleChange}
          />
        </label>
        <div className="form-actions">
          <button type="submit">Add Product</button>
          <button type="button" onClick={() =>navigate("/admin")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
