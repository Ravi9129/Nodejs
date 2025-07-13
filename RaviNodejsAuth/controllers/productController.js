const Product = require('../models/Product');
const errorHandler = require('../utils/errorHandler');

// Create a product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;
    
    const product = new Product({
      name,
      description,
      price,
      category,
      user: req.user.id
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Get all products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('user', 'name email');
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Get single product
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('user', 'name email');
    if (!product) {
      return next(errorHandler(404, 'Product not found'));
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Update product
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return next(errorHandler(404, 'Product not found'));
    }

    // Make sure user is product owner or admin
    if (product.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(errorHandler(401, 'Not authorized to update this product'));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return next(errorHandler(404, 'Product not found'));
    }

    // Make sure user is product owner or admin
    if (product.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(errorHandler(401, 'Not authorized to delete this product'));
    }

    await product.remove();
    res.json({ success: true, message: 'Product removed' });
  } catch (err) {
    next(err);
  }
};