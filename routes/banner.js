const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const { auth, admin } = require('../utils/auth');

// Public routes
router.get('/', bannerController.getBanners);
router.get('/:id', bannerController.getBanner);

// Admin routes
router.post('/', auth, admin, bannerController.createBanner);
router.put('/:id', auth, admin, bannerController.updateBanner);
router.delete('/:id', auth, admin, bannerController.deleteBanner);

module.exports = router;
