const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, admin } = require('../utils/auth');

// Auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Profile routes (protected)
router.get('/me', auth, userController.getProfile);
router.put('/me', auth, userController.updateProfile);
router.get('/activities', auth, userController.getActivities);

// Admin routes
router.get('/all', auth, admin, userController.getAllUsers);

module.exports = router;
