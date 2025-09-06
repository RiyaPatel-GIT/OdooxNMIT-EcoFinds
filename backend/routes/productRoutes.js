const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { verifyJWT } = require('../middleware/auth.Middleware');

// Public routes
router.get('/', getAllProducts); // Get all products with filters
router.get('/:id', getProductById); // Get single product

// Protected routes (User logged in)
router.post('/', verifyJWT, addProduct); // Add new product (User logged in)
router.put('/:id', verifyJWT, updateProduct); // Update product (User logged in)
router.delete('/:id', verifyJWT, deleteProduct); // Delete product (User logged in)

module.exports = router;
