const Color = require('../models/Color');

const getColors = async (req, res) => {
  try {
    const colors = await Color.find().sort({ createdAt: -1 });
    res.json(colors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getColor = async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.json(color);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createColor = async (req, res) => {
  try {
    const color = new Color(req.body);
    await color.save();
    res.status(201).json({ message: 'Color created successfully', color });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateColor = async (req, res) => {
  try {
    const color = await Color.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!color) {
      return res.status(404).json({ message: 'Color not found' });
    }

    res.json({ message: 'Color updated successfully', color });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteColor = async (req, res) => {
  try {
    const color = await Color.findByIdAndDelete(req.params.id);
    
    if (!color) {
      return res.status(404).json({ message: 'Color not found' });
    }

    res.json({ message: 'Color deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getColors,
  getColor,
  createColor,
  updateColor,
  deleteColor
};
