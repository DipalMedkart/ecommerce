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
// import * as jwt_decode from 'jwt-decode';
// import jwt from "jwt-decode";
// import jwt_decode from "jwt-decode";
// const jwt_decode = require('jwt-decode');
// import  {default as jwt_decode} from 'jwt-decode';
// const jwt_decode = require('jwt-decode').default;

// import jwt from "jsonwebtoken"


// console.log(jwt_decode);  // This should log a function definition





const CustomerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

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
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Error fetching products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const handleSearchQuery = async (query) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      return; // Do not send a request if the query is empty
    }

    try {
      const response = await axios.get(`http://localhost:5000/products/search?query=${query}`, {
        params: { query },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setFilteredProducts(response.data); // Update the products with search results
    } catch (err) {
      console.log(err);
      setError('Error searching products. Please try again later.');
    }
  };

  // const filteredProducts = products.filter((product) =>
  //   product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // Handle search query and filter products
  // const handleSearch = (query) => {
  //   if (query.trim() === '') {
  //     setFilteredProducts(products);  // Show all products if search is empty
  //   } else {
  //     const filtered = products.filter(product =>
  //       product.product_name.toLowerCase().includes(query.toLowerCase()) ||
  //       product.ws_code.toLowerCase().includes(query.toLowerCase()) // Filter by name or code
  //     );
  //     setFilteredProducts(filtered); // Set filtered products
  //   }
  // }


  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };


  // Decrease quantity
  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };




  // const handlePlaceOrder = async () => {
  //   if (cart.length === 0) {
  //     alert("Your cart is empty. Add some products before placing an order.");
  //     return;
  //   }

  //   const token = localStorage.getItem('token');
  //   let user_id = null;

  //   console.log("Token:", token)

  //   if (!token) {
  //     alert("You need to log in again.");
  //     // Redirect to login page or handle accordingly
  //   } else {
  //     try {


  //       const decodedToken = jwt.decode(token);
  //       console.log(decodedToken);
  //       const user_id = decodedToken.id;  // Assuming your token contains user_id
  //       // Use userId as needed
  //       console.log(user_id);
  //     } catch (err) {
  //       alert("Failed to extract user information. Please log in again.");
  //       console.error(err);
  //     }
  //   }

  //   if (!user_id) {
  //     alert("User not logged in. Please log in to place an order.");
  //     return;
  //   }

  //   const orderItems = cart.map(item => ({
  //     product_id: item.id,
  //     quantity: item.quantity
  //   }));


  //   try {
  //     // Send order data to the backend without bill_amount
  //     const response = await axios.post('http://localhost:5000/orders/', {
  //       user_id: user_id,
  //       items: orderItems,
  //       status: 'Pending', // Or any other status you'd like to set
  //     });

  //     if (response.status === 201) {
  //       // Order placed successfully
  //       alert("Your order has been placed successfully!");

  //       // Clear the cart after placing the order
  //       setCart([]);
  //       handleCartToggle(); // Hide the cart modal
  //     }
  //   } catch (err) {
  //     console.error("Error placing order:", err);
  //     alert("Failed to place the order. Please try again later.");
  //   }
  // };

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(window.atob(base64));
    return decoded;
  };

  const handlePlaceOrder = async () => {
    // Step 1: Check if the cart is empty
    if (cart.length === 0) {
      alert("Your cart is empty. Add some products before placing an order.");
      return;
    }

    // Step 2: Get token and user_id from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert("You need to log in again.");
      // Redirect to login page or handle accordingly
      return;
    }


    // Step 3: Decode token to extract user info (user_id)
    let user_id = null;
    try {
      // const decodedToken = jwt.decode(token);
      const decodedToken = decodeToken(token);
      user_id = decodedToken.id; // Assuming token contains user_id
      console.log("User ID:", user_id);
    } catch (err) {
      alert("Failed to extract user information. Please log in again.");
      console.error("Token decoding error:", err);
      return;
    }

    // Step 4: Check if user_id is valid
    if (!user_id) {
      alert("User not logged in. Please log in to place an order.");
      return;
    }


    // Step 5: Prepare order items from cart
    const orderItems = cart.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      sales_price: item.sales_price,
      // mrp: item.mrp,
    }));

    console.log(orderItems);

    // const billAmount = orderItems.reduce((total, item) => total + (item.mrp * item.quantity), 0);
    const billAmount = orderItems.reduce((total, item) => total + (item.sales_price * item.quantity), 0);

    console.log(billAmount);


    // Step 6: Place the order
    try {
      const response = await axios.post('http://localhost:5000/orders/', {
        user_id: user_id,
        items: orderItems,
        bill_amount: billAmount,
        status: 'Pending', // Adjust order status as needed
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.status === 201) {
        // Step 7: Handle successful order placement
        alert("Your order has been placed successfully!");

        // Clear the cart after placing the order
        setCart([]);
        handleCartToggle();
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place the order. Please try again later.");
    }
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
      {/* <Navbar cartCount={cart.length} onCartClick={handleCartToggle} searchQuery={searchQuery}
        handleSearchQuery={handleSearchQuery} /> */}
      <Navbar cartCount={cart.length} onCartClick={handleCartToggle}  />
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
                <div className="product-prices">
                  {product.mrp !== product.sales_price && (
                    <span className="product-mrp">
                      <s>${product.mrp}</s>
                    </span>
                  )}
                  <span className="product-sales-price">${product.sales_price}</span>
                </div>

                {/* <p className="product-price">Price: ${product.mrp}</p> */}
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


        {isCartVisible && (
          <>
            <div className="cart-overlay" onClick={handleCartToggle}></div>
            <div className="cart-modal">
              <div className="cart-modal-content">
                <h3>Cart Summary</h3>
                {cart.length > 0 ? (
                  <>
                    <ul>
                      {cart.map((item) => (
                        <li key={item.id} className="cart-item">
                          <span>{item.product_name} - ${item.mrp}</span>
                          <div className="quantity-controls">
                            <button onClick={() => decreaseQuantity(item.id)} className=''>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => increaseQuantity(item.id)}>+</button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p>Total Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
                    {/* <p>Total Price: ${cart.reduce((acc, item) => acc + item.mrp * item.quantity, 0)}</p> */}
                    <p>Total Price: ${cart.reduce((acc, item) => acc + item.sales_price * item.quantity, 0)}</p>


                    <div className="cart-actions">
                      <button className="place-order-btn" onClick={handlePlaceOrder}>
                        Place Order
                      </button>
                      <button onClick={handleCartToggle} className="close-btn">
                        Close
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>Your cart is empty.</p>
                    <div className="cart-actions">
                      <button onClick={handleCartToggle} className="close-btn">
                        Close
                      </button>
                    </div>
                  </>
                )}

              </div>
            </div>
          </>
        )}
      </div>
    </>
  );

};

export default CustomerDashboard;

