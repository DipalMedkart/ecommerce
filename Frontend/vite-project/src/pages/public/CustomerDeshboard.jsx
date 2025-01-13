// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../style/CustomerDeshboard.css"; // Add styles if needed

// const CustomerDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem('token');
//   console.log(token);


//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/products/",{
//           headers: {
//             'Authorization': `Bearer ${token}` ,
//             'Content-Type': 'application/json'
//           }
//         });
//         setProducts(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.log(err);

//         setError("Error fetching products. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <div>Loading products...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="customer-dashboard">
//       <h2>Product List</h2>
//       <div className="products-container">
//         {products.map((product) => (
//           <div className="product-card" key={product.id}>
//             <h3>{product.product_name}</h3>
//             <p>{product.ws_code}</p>
//             <p>Price: ${product.mrp}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;


// CustomerDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/CustomerDeshboard2.css';
import Navbar from '../../component/Navbar';
import AdminNavbar from '../../component/AdminNavbar';



const CustomerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products/", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error fetching products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleCartToggle = () => {
    setIsCartVisible(!isCartVisible);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>

      <Navbar />
      <div className="customer-dashboard">
        <h2>Product List</h2>
        <div className="products-container">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                // src={product.image_url || "/default-image.jpg"} // Handle missing images
                src="../../../public/images/cat.jpg" // Handle missing images
                alt={product.product_name}
                className="product-image"
              />
              <div className="product-info">
                <h3 className="product-name">{product.product_name}</h3>
                <p className="product-price">Price: ${product.mrp}</p>
              </div>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* <div className="cart-summary">
          <h3>Cart Summary</h3>
          <ul>
            {cart.map((product, index) => (
              <li key={index}>
                {product.product_name} - ${product.mrp}
              </li>
            ))}
          </ul>
          <p>Total Items: {cart.length}</p>
        </div>
      */}

        {isCartVisible && (
          <div className="cart-modal">
            <div className="cart-modal-content">
              <h3>Cart Summary</h3>
              <ul>
                {cart.map((product, index) => (
                  <li key={index}>
                    {product.product_name} - ${product.mrp}
                  </li>
                ))}
              </ul>
              <p>Total Items: {cart.length}</p>
              <button onClick={handleCartToggle}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerDashboard;

