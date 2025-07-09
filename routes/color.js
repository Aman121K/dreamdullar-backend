const express = require('express');
const router = express.Router();
const colorController = require('../controllers/colorController');
const { auth, admin } = require('../utils/auth');

router.get('/', colorController.getColors);
router.get('/:id', colorController.getColor);
router.post('/', auth, admin, colorController.createColor);
router.put('/:id', auth, admin, colorController.updateColor);
router.delete('/:id', auth, admin, colorController.deleteColor);

module.exports = router;
