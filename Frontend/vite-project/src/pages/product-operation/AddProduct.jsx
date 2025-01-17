// import React, { useState } from "react";
// import "../style/AddProduct.css";
// import { useNavigate } from "react-router-dom";

// const AddProduct = ({ onClose }) => {
//   const navigate = useNavigate();

//   const [productData, setProductData] = useState({
//     product_name: "",
//     ws_code: "",
//     sales_price: "",
//     mrp: "",
//     package_size: "",
//     images: "",
//     tags: "",
//     category_id: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProductData({ ...productData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formattedData = {
//       product_name: productData.product_name,
//       ws_code: productData.ws_code ? parseInt(productData.ws_code) : null,
//       sales_price: parseInt(productData.sales_price),
//       mrp: parseInt(productData.mrp),
//       package_size: parseInt(productData.package_size),
//       images: productData.images ? productData.images.split(",") : [],
//       tags: productData.tags ? productData.tags.split(",") : [],
//       category_id: productData.category_id
//         ? parseInt(productData.category_id)
//         : null,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/products/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(formattedData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert(result.message);
//         onClose();
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message || "Failed to add product.");
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("An error occurred while adding the product.");
//     }
//   };

//   return (
//     <div className="form-container">
//       <form className="form" onSubmit={handleSubmit}>
//         <h2>Add New Product</h2>
//         <div className="form-group">
//           <label>Product Name:</label>
//           <input
//             type="text"
//             name="product_name"
//             value={productData.product_name}
//             onChange={handleChange}
//             required
//             className="form-control"
//           />
//         </div>

//         <div className="form-group">
//           <label>WS Code:</label>
//           <input
//             type="number"
//             name="ws_code"
//             value={productData.ws_code}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="form-group">
//           <label>Sales Price:</label>
//           <input
//             type="number"
//             name="sales_price"
//             value={productData.sales_price}
//             onChange={handleChange}
//             required
//             className="form-control"
//           />
//         </div>

//         <div className="form-group">
//           <label>MRP:</label>
//           <input
//             type="number"
//             name="mrp"
//             value={productData.mrp}
//             onChange={handleChange}
//             required
//             className="form-control"
//           />
//         </div>

//         <div className="form-group">
//           <label>Package Size:</label>
//           <input
//             type="number"
//             name="package_size"
//             value={productData.package_size}
//             onChange={handleChange}
//             required
//             className="form-control"
//           />
//         </div>

//         <div className="form-group">
//           <label>Images (Comma-separated URLs):</label>
//           <input
//             type="text"
//             name="images"
//             value={productData.images}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="form-group">
//           <label>Tags (Comma-separated):</label>
//           <input
//             type="text"
//             name="tags"
//             value={productData.tags}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="form-group">
//           <label>Category ID:</label>
//           <input
//             type="number"
//             name="category_id"
//             value={productData.category_id}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         <div className="form-actions">
//           <button type="submit" className="btn btn-primary">Add Product</button>
//           <button
//             type="button"
//             onClick={() => navigate("/admin")}
//             className="btn btn-secondary"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
import React, { useState } from "react";
import "../style/AddProduct.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
// import jwt_decode from "jwt-decode";

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
      // images: productData.images ? productData.images.split(",") : [],
      // tags: productData.tags ? productData.tags.split(",") : [],
      // images: productData.images ? `{${productData.images.split(",").join(",")}}` : [],
      // tags: productData.tags ? `{${productData.tags.split(",").join(",")}}` : [],
      images: productData.images ? productData.images.split(",").map(url => `"${url.trim()}"`).join(",") : [],
      tags: productData.tags ? productData.tags.split(",").map(tag => `"${tag.trim()}"`).join(",") : [],
      category_id: productData.category_id
        ? parseInt(productData.category_id)
        : null,
    };

    const token = localStorage.getItem("token");
    console.log(formattedData);

    try {
      const response = await axios.post(
        "http://localhost:5000/products/create",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is added here
            "Content-Type": "application/json",
          },
        }
      );
      console.log("jsdkfjs: ",response);

      if (response.status >=200 && response.status <= 299) {
        const result = response
        alert(result.data.message);
        // onClose();
      } else {
        const errorData = await response.json();
        console.log(errorData)
        alert(errorData.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("jsdkfjs Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };


  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Add Product</h2>

        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="product_name"
            value={productData.product_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>WS Code:</label>
          <input
            type="number"
            name="ws_code"
            value={productData.ws_code}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Sales Price:</label>
          <input
            type="number"
            name="sales_price"
            value={productData.sales_price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>MRP:</label>
          <input
            type="number"
            name="mrp"
            value={productData.mrp}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Package Size:</label>
          <input
            type="number"
            name="package_size"
            value={productData.package_size}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Images (Comma-separated URLs):</label>
          <input
            type="text"
            name="images"
            value={productData.images}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Tags (Comma-separated):</label>
          <input
            type="text"
            name="tags"
            value={productData.tags}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category ID:</label>
          <input
            type="number"
            name="category_id"
            value={productData.category_id}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit">Add Product</button>
          <button type="button" onClick={() => navigate("/admin-dashboard")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
