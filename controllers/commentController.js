const Comment = require('../models/Comment');
const Product = require('../models/Product');
const Activity = require('../models/Activity');

// Get comments for a product
const getProductComments = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const comments = await Comment.find({ product: productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add comment to product
const addComment = async (req, res) => {
  try {
    const { productId } = req.params;
    const { text, rating } = req.body;
    const userId = req.userId;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already commented
    const existingComment = await Comment.findOne({ 
      product: productId, 
      user: userId 
    });

    if (existingComment) {
      return res.status(400).json({ message: 'You have already commented on this product' });
    }

    const comment = new Comment({
      product: productId,
      user: userId,
      text,
      rating
    });

    await comment.save();

    // Add comment to product
    product.comments.push(comment._id);
    await product.save();

    // Create activity
    const activity = new Activity({
      user: userId,
      type: 'add_comment',
      details: `Commented on ${product.name}`
    });
    await activity.save();

    const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'name');

    res.status(201).json({ 
      message: 'Comment added successfully', 
      comment: populatedComment 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update comment
const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text, rating } = req.body;
    const userId = req.userId;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user owns the comment or is admin
    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    if (text) comment.text = text;
    if (rating) comment.rating = rating;

    await comment.save();

    const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'name');

    res.json({ 
      message: 'Comment updated successfully', 
      comment: populatedComment 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete comment
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.userId;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user owns the comment or is admin
    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    // Remove comment from product
    await Product.findByIdAndUpdate(comment.product, {
      $pull: { comments: commentId }
    });

    await comment.remove();

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getProductComments,
  addComment,
  updateComment,
  deleteComment
};
