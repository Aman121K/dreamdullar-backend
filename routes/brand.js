const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const { auth, admin } = require('../utils/auth');

// Public routes
router.get('/', brandController.getBrands);
router.get('/:id', brandController.getBrand);

// Admin routes
router.post('/', auth, admin, brandController.createBrand);
router.put('/:id', auth, admin, brandController.updateBrand);
router.delete('/:id', auth, admin, brandController.deleteBrand);

module.exports = router;
