const express = require('express');
const router = express.Router();
const sizeController = require('../controllers/sizeController');
const { auth, admin } = require('../utils/auth');

// Public routes
router.get('/', sizeController.getSizes);
router.get('/:id', sizeController.getSize);

// Admin routes
router.post('/', auth, admin, sizeController.createSize);
router.put('/:id', auth, admin, sizeController.updateSize);
router.delete('/:id', auth, admin, sizeController.deleteSize);

module.exports = router;
