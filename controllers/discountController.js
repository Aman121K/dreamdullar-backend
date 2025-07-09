const Discount = require('../models/Discount');

// Get all discounts
const getDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find().sort({ createdAt: -1 });
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single discount
const getDiscount = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id);
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.json(discount);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create discount
const createDiscount = async (req, res) => {
  try {
    const discount = new Discount(req.body);
    await discount.save();
    res.status(201).json({ message: 'Discount created successfully', discount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update discount
const updateDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }

    res.json({ message: 'Discount updated successfully', discount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete discount
const deleteDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }

    res.json({ message: 'Discount deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Validate discount code
const validateDiscount = async (req, res) => {
  try {
    const { code } = req.params;
    
    const discount = await Discount.findOne({ code });
    if (!discount) {
      return res.status(404).json({ message: 'Invalid discount code' });
    }

    const now = new Date();
    if (discount.startDate && now < discount.startDate) {
      return res.status(400).json({ message: 'Discount not yet active' });
    }

    if (discount.endDate && now > discount.endDate) {
      return res.status(400).json({ message: 'Discount has expired' });
    }

    res.json({ 
      message: 'Discount code valid', 
      discount: {
        id: discount._id,
        code: discount.code,
        type: discount.type,
        value: discount.value
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getDiscounts,
  getDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  validateDiscount
};
