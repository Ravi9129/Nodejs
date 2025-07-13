const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware.protect, productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', authMiddleware.protect, productController.updateProduct);
router.delete('/:id', authMiddleware.protect, productController.deleteProduct);

module.exports = router;