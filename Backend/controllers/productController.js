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

  const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { product_name, ws_code, sales_price, mrp, package_size, images, tags, category_id } = req.body;
  
    try {
      const result = await pool.query(
        `UPDATE products 
         SET product_name = COALESCE($1, product_name),
             ws_code = COALESCE($2, ws_code),
             sales_price = COALESCE($3, sales_price),
             mrp = COALESCE($4, mrp),
             package_size = COALESCE($5, package_size),
             images = COALESCE($6, images),
             tags = COALESCE($7, tags),
             category_id = COALESCE($8, category_id)
         WHERE id = $9
         RETURNING *`,
        [product_name, ws_code, sales_price, mrp, package_size, images, tags, category_id, id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product updated successfully', product: result.rows[0] });
    } catch (err) {
      res.status(500).json({ error: 'Error updating product', details: err.message });
    }
  };
  
  // Delete a product by ID (Admin only)
  const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully', product: result.rows[0] });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting product', details: err.message });
    }
  };
  
  
  module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct}; 
  

