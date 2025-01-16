import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/AdminProducts2.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    product_name: '',
    ws_code: '',
    sales_price: '',
    mrp: '',
    package_size: '',
    images: '',
    tags: '',
    category_id: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/products/products/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });
  //     setProducts(products.filter((product) => product.id !== id)); 
  //     alert('Product deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting product', error);
  //   }
  // };

  const handleDelete = async (id) => {
    // Show confirmation box
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/products/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProducts(products.filter((product) => product.id !== id));
        alert('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product', error);
      }
    }
  };


  const handleEdit = (product) => {
    setEditProduct(product);
    setUpdatedProduct({
      product_name: product.product_name,
      ws_code: product.ws_code,
      sales_price: product.sales_price,
      mrp: product.mrp,
      package_size: product.package_size,
      images: product.images.join(', '),
      tags: product.tags.join(', '),
      category_id: product.category_id,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        ...updatedProduct,
        images: updatedProduct.images.split(', ').map((image) => image.trim()),
        tags: updatedProduct.tags.split(', ').map((tag) => tag.trim()),
      };

      await axios.put(`http://localhost:5000/products/products/${editProduct.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setProducts(products.map((product) =>
        product.id === editProduct.id ? { ...product, ...updatedData } : product
      ));
      setEditProduct(null);
      alert('Product updated successfully');
    } catch (error) {
      console.error('Error updating product', error);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="admin-products-container">
      <h1>All Products</h1>


      {editProduct && (
        <div className="update-form-container">
          <div className="update-form-overlay"></div>
          <div className="update-form">
            <h2>Edit Product</h2>
            <label>Product Name:</label>
            <input
              type="text"
              name="product_name"
              value={updatedProduct.product_name}
              onChange={handleInputChange}
            />
            <label>WS Code:</label>
            <input
              type="text"
              name="ws_code"
              value={updatedProduct.ws_code}
              onChange={handleInputChange}
            />
            <label>Sales Price:</label>
            <input
              type="text"
              name="sales_price"
              value={updatedProduct.sales_price}
              onChange={handleInputChange}
            />
            <label>MRP:</label>
            <input
              type="text"
              name="mrp"
              value={updatedProduct.mrp}
              onChange={handleInputChange}
            />
            <label>Package Size:</label>
            <input
              type="text"
              name="package_size"
              value={updatedProduct.package_size}
              onChange={handleInputChange}
            />
            <label>Images (Comma separated URLs):</label>
            <input
              type="text"
              name="images"
              value={updatedProduct.images}
              onChange={handleInputChange}
            />
            <label>Tags (Comma separated):</label>
            <input
              type="text"
              name="tags"
              value={updatedProduct.tags}
              onChange={handleInputChange}
            />
            <label>Category ID:</label>
            <input
              type="text"
              name="category_id"
              value={updatedProduct.category_id}
              onChange={handleInputChange}
            />
            <button type="button" onClick={handleUpdate}>Update</button>
            <button type="button" className="cancel" onClick={() => setEditProduct(null)}>Cancel</button>
          </div>
        </div>
      )}
      {/*       
      <ul>
        {products.length > 0 ?( products.map((product) => (
          <li key={product.id}>
            <div className="product-details">
              <p><span>Name:</span> {product.product_name}</p>
              <p><span>ws_code:</span> {product.ws_code}</p>
              <p><span>MRP:</span> ${product.mrp}</p>
              <p><span>Sales Price:</span> ${product.sales_price}</p>
              <p><span>Category Id:</span> ${product.category_id}</p>

            </div>
            <button className='update' onClick={() => handleEdit(product)}>Update</button>
            <button className='delete' onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))) : (
          <p>No products available.</p>
        ) }
      </ul> */}

      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>WS Code</th>
            <th>MRP</th>
            <th>Sales Price</th>
            <th>Package Size</th>
            <th>Stock Available</th>
            <th>Category ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.product_name}</td>
                <td>{product.ws_code}</td>
                <td>${product.mrp}</td>
                <td>${product.sales_price}</td>
                <td>{product.package_size}</td>
                <td>{product.available_stock}</td>
                <td>{product.category_id}</td>
                <td>
                  <button className="update" onClick={() => handleEdit(product)}>
                    Update
                  </button>
                  <button className="delete" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No products available.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
          <button 
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
