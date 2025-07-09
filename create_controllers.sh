#!/bin/bash

# Create Color controller
cat > controllers/colorController.js << 'COLOR_EOF'
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
COLOR_EOF

# Create Color routes
cat > routes/color.js << 'COLOR_ROUTES_EOF'
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
COLOR_ROUTES_EOF

echo "Created Color controller and routes"
