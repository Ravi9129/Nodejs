const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/auth');

router.get('/users', authMiddleware.protect, authMiddleware.authorize('admin'), adminController.getAllUsers);
router.get('/users/:id', authMiddleware.protect, authMiddleware.authorize('admin'), adminController.getUser);
router.put('/users/:id', authMiddleware.protect, authMiddleware.authorize('admin'), adminController.updateUser);
router.delete('/users/:id', authMiddleware.protect, authMiddleware.authorize('admin'), adminController.deleteUser);

module.exports = router;