const Size = require('../models/Size');

// Get all sizes
const getSizes = async (req, res) => {
  try {
    const sizes = await Size.find().sort({ createdAt: -1 });
    res.json(sizes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single size
const getSize = async (req, res) => {
  try {
    const size = await Size.findById(req.params.id);
    if (!size) {
      return res.status(404).json({ message: 'Size not found' });
    }
    res.json(size);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create size
const createSize = async (req, res) => {
  try {
    const size = new Size(req.body);
    await size.save();
    res.status(201).json({ message: 'Size created successfully', size });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update size
const updateSize = async (req, res) => {
  try {
    const size = await Size.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!size) {
      return res.status(404).json({ message: 'Size not found' });
    }

    res.json({ message: 'Size updated successfully', size });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete size
const deleteSize = async (req, res) => {
  try {
    const size = await Size.findByIdAndDelete(req.params.id);
    
    if (!size) {
      return res.status(404).json({ message: 'Size not found' });
    }

    res.json({ message: 'Size deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getSizes,
  getSize,
  createSize,
  updateSize,
  deleteSize
};
