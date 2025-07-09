const Product = require('../models/Product');
const User = require('../models/User');
const Activity = require('../models/Activity');

// Get all products with filtering
const getProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      brand, 
      size, 
      color, 
      ageGroup,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (brand) filter.brand = brand;
    if (size) filter.sizes = size;
    if (color) filter.colors = color;
    if (ageGroup) filter.ageGroups = ageGroup;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const products = await Product.find(filter)
      .populate('brand', 'name')
      .populate('sizes', 'name')
      .populate('colors', 'name')
      .populate('ageGroups', 'name')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('brand', 'name')
      .populate('sizes', 'name')
      .populate('colors', 'name')
      .populate('ageGroups', 'name')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'name'
        }
      });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create product (admin only)
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update product (admin only)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete product (admin only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Like/Unlike product
const toggleLike = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(userId);
    const isLiked = user.likedProducts.includes(productId);

    if (isLiked) {
      // Unlike
      user.likedProducts = user.likedProducts.filter(id => id.toString() !== productId);
      product.likes = product.likes.filter(id => id.toString() !== userId);
    } else {
      // Like
      user.likedProducts.push(productId);
      product.likes.push(userId);
    }

    await user.save();
    await product.save();

    // Create activity
    const activity = new Activity({
      user: userId,
      type: isLiked ? 'unlike_product' : 'like_product',
      details: `${isLiked ? 'Unliked' : 'Liked'} product: ${product.name}`
    });
    await activity.save();

    res.json({ 
      message: `Product ${isLiked ? 'unliked' : 'liked'} successfully`,
      isLiked: !isLiked
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Rate product
const rateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating } = req.body;
    const userId = req.userId;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already rated
    const existingRating = product.ratings.find(r => r.user.toString() === userId);
    
    if (existingRating) {
      existingRating.value = rating;
    } else {
      product.ratings.push({ user: userId, value: rating });
    }

    await product.save();

    // Create activity
    const activity = new Activity({
      user: userId,
      type: 'rate_product',
      details: `Rated product: ${product.name} with ${rating} stars`
    });
    await activity.save();

    res.json({ message: 'Product rated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleLike,
  rateProduct
};
