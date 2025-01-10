const pool = require('../db/db.js');


const getAllProducts = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM products');
      
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching products.', error: err.message });
      
    }
  };


  
  const getProductById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Product not found.' });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching product.', error: err.message });
    }
  };

  const createProduct = async (req, res) => {
    const { product_name, ws_code, sales_price, mrp, package_size, images, tags, category_id } =
      req.body;
  
    // Validate required fields
    if (!product_name || !sales_price || !mrp || !package_size) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
  
    try {
      const result = await pool.query(
        `INSERT INTO products 
        (product_name, ws_code, sales_price, mrp, package_size, images, tags, category_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *`,
        [
          product_name,
          ws_code || 0,
          sales_price,
          mrp,
          package_size,
          images || [],
          tags || [],
          category_id,
        ]
      );
      res.status(201).json({ message: 'Product created successfully.', product: result.rows[0] });
    } catch (err) {
      res.status(500).json({ message: 'Error creating product.', error: err.message });
    }
  };
  
  module.exports = { getAllProducts, getProductById, createProduct}; 
  

