const express = require('express');
const router = express.Router();
const ageGroupController = require('../controllers/ageGroupController');
const { auth, admin } = require('../utils/auth');

// Public routes
router.get('/', ageGroupController.getAgeGroups);
router.get('/:id', ageGroupController.getAgeGroup);

// Admin routes
router.post('/', auth, admin, ageGroupController.createAgeGroup);
router.put('/:id', auth, admin, ageGroupController.updateAgeGroup);
router.delete('/:id', auth, admin, ageGroupController.deleteAgeGroup);

module.exports = router;
