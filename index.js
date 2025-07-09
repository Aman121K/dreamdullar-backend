require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Health check
app.get('/', (req, res) => {
  res.send('E-commerce API is running');
});

// Import routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const brandRoutes = require('./routes/brand');
const sizeRoutes = require('./routes/size');
const colorRoutes = require('./routes/color');
const ageGroupRoutes = require('./routes/ageGroup');
const bannerRoutes = require('./routes/banner');
const discountRoutes = require('./routes/discount');
const cartRoutes = require('./routes/cart');
const commentRoutes = require('./routes/comment');
const dashboardRoutes = require('./routes/dashboard');

// Use routes
app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/sizes', sizeRoutes);
app.use('/api/colors', colorRoutes);
app.use('/api/age-groups', ageGroupRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 