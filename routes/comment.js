const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { auth } = require('../utils/auth');

// Public routes
router.get('/product/:productId', commentController.getProductComments);

// Protected routes
router.post('/product/:productId', auth, commentController.addComment);
router.put('/:commentId', auth, commentController.updateComment);
router.delete('/:commentId', auth, commentController.deleteComment);

module.exports = router;
