const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [String],
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  sizes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Size' }],
  colors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color' }],
  ageGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AgeGroup' }],
  stock: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    value: { type: Number, min: 1, max: 5 },
  }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
