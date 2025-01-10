
const express = require('express');
const { authenticate, authorize } = require('../middleware/authenticate');
const router = express.Router();

// const authenticateUser = require('../middleware/authenticate');
const { 
 getAllProducts, 
  createProduct, 
getProductById, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

// Public Routes
router.get('/',authenticate, getAllProducts);          
router.get('/:id',authenticate, getProductById);

// Admin-Only Routes
router.post('/create', authenticate, authorize(["Admin"]), createProduct);    
router.put('/products/:id', authenticate, authorize(["Admin"]), updateProduct); 
router.delete('/products/:id', authenticate, authorize(["Admin"]), deleteProduct); 

module.exports = router;
