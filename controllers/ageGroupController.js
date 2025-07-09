const AgeGroup = require('../models/AgeGroup');

// Get all age groups
const getAgeGroups = async (req, res) => {
  try {
    const ageGroups = await AgeGroup.find().sort({ createdAt: -1 });
    res.json(ageGroups);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single age group
const getAgeGroup = async (req, res) => {
  try {
    const ageGroup = await AgeGroup.findById(req.params.id);
    if (!ageGroup) {
      return res.status(404).json({ message: 'Age group not found' });
    }
    res.json(ageGroup);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create age group
const createAgeGroup = async (req, res) => {
  try {
    const ageGroup = new AgeGroup(req.body);
    await ageGroup.save();
    res.status(201).json({ message: 'Age group created successfully', ageGroup });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update age group
const updateAgeGroup = async (req, res) => {
  try {
    const ageGroup = await AgeGroup.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!ageGroup) {
      return res.status(404).json({ message: 'Age group not found' });
    }

    res.json({ message: 'Age group updated successfully', ageGroup });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete age group
const deleteAgeGroup = async (req, res) => {
  try {
    const ageGroup = await AgeGroup.findByIdAndDelete(req.params.id);
    
    if (!ageGroup) {
      return res.status(404).json({ message: 'Age group not found' });
    }

    res.json({ message: 'Age group deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAgeGroups,
  getAgeGroup,
  createAgeGroup,
  updateAgeGroup,
  deleteAgeGroup
};
