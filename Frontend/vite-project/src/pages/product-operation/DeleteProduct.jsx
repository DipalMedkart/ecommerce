import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/DeleteProduct.css";

const DeleteProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products/");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching products. Please try again.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter((product) => product.id !== id)); // Update UI
      alert("Product deleted successfully.");
    } catch (err) {
      alert("Error deleting product.");
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="delete-products-page">
      <h2>Delete Products</h2>
      <div className="products-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button
              className="delete-btn"
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteProducts;
