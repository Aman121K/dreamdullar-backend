const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
  size: { type: mongoose.Schema.Types.ObjectId, ref: 'Size' },
  color: { type: mongoose.Schema.Types.ObjectId, ref: 'Color' },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  payment: {
    method: String,
    transactionId: String,
    status: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
