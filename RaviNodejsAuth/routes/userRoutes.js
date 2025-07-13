const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

router.put('/profile', authMiddleware.protect, userController.updateProfile);
router.put('/change-password', authMiddleware.protect, userController.changePassword);
router.delete('/delete-account', authMiddleware.protect, userController.deleteAccount);

module.exports = router;