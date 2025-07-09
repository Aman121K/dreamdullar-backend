const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { auth, admin } = require('../utils/auth');

// All dashboard routes require admin authentication
router.use(auth, admin);

router.get('/overview', dashboardController.getDashboardOverview);
router.get('/users', dashboardController.getUserStats);
router.get('/products', dashboardController.getProductStats);
router.get('/orders', dashboardController.getOrderStats);

module.exports = router; 