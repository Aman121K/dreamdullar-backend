const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');
const { auth, admin } = require('../utils/auth');

// Public routes
router.get('/', discountController.getDiscounts);
router.get('/:id', discountController.getDiscount);
router.get('/validate/:code', discountController.validateDiscount);

// Admin routes
router.post('/', auth, admin, discountController.createDiscount);
router.put('/:id', auth, admin, discountController.updateDiscount);
router.delete('/:id', auth, admin, discountController.deleteDiscount);

module.exports = router;
