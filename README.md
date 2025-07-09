# E-commerce Backend API

A comprehensive Node.js backend API for an e-commerce platform selling night suits for women and kids. Built with Express.js and MongoDB.

## Features

- **User Authentication & Management**
- **Product Management** (CRUD operations)
- **Brand, Size, Color, Age Group Management**
- **Cart & Wishlist Management**
- **Product Comments & Ratings**
- **Discount & Coupon System**
- **Order Management**
- **User Activities Tracking**
- **Admin Dashboard with Statistics**
- **Banner Management**

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get user profile (protected)
- `PUT /api/auth/me` - Update user profile (protected)
- `GET /api/auth/activities` - Get user activities (protected)
- `GET /api/auth/all` - Get all users (admin only)

### Products

- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `POST /api/products/:productId/like` - Like/unlike product (protected)
- `POST /api/products/:productId/rate` - Rate product (protected)

### Brands

- `GET /api/brands` - Get all brands
- `GET /api/brands/:id` - Get single brand
- `POST /api/brands` - Create brand (admin only)
- `PUT /api/brands/:id` - Update brand (admin only)
- `DELETE /api/brands/:id` - Delete brand (admin only)

### Sizes

- `GET /api/sizes` - Get all sizes
- `GET /api/sizes/:id` - Get single size
- `POST /api/sizes` - Create size (admin only)
- `PUT /api/sizes/:id` - Update size (admin only)
- `DELETE /api/sizes/:id` - Delete size (admin only)

### Colors

- `GET /api/colors` - Get all colors
- `GET /api/colors/:id` - Get single color
- `POST /api/colors` - Create color (admin only)
- `PUT /api/colors/:id` - Update color (admin only)
- `DELETE /api/colors/:id` - Delete color (admin only)

### Age Groups

- `GET /api/age-groups` - Get all age groups
- `GET /api/age-groups/:id` - Get single age group
- `POST /api/age-groups` - Create age group (admin only)
- `PUT /api/age-groups/:id` - Update age group (admin only)
- `DELETE /api/age-groups/:id` - Delete age group (admin only)

### Banners

- `GET /api/banners` - Get all banners
- `GET /api/banners/:id` - Get single banner
- `POST /api/banners` - Create banner (admin only)
- `PUT /api/banners/:id` - Update banner (admin only)
- `DELETE /api/banners/:id` - Delete banner (admin only)

### Discounts

- `GET /api/discounts` - Get all discounts
- `GET /api/discounts/:id` - Get single discount
- `GET /api/discounts/validate/:code` - Validate discount code
- `POST /api/discounts` - Create discount (admin only)
- `PUT /api/discounts/:id` - Update discount (admin only)
- `DELETE /api/discounts/:id` - Delete discount (admin only)

### Cart

- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `PUT /api/cart/item/:itemId` - Update cart item (protected)
- `DELETE /api/cart/item/:itemId` - Remove item from cart (protected)
- `DELETE /api/cart/clear` - Clear cart (protected)

### Comments

- `GET /api/comments/product/:productId` - Get product comments
- `POST /api/comments/product/:productId` - Add comment (protected)
- `PUT /api/comments/:commentId` - Update comment (protected)
- `DELETE /api/comments/:commentId` - Delete comment (protected)

### Dashboard (Admin Only)

- `GET /api/dashboard/overview` - Get dashboard overview
- `GET /api/dashboard/users` - Get user statistics
- `GET /api/dashboard/products` - Get product statistics
- `GET /api/dashboard/orders` - Get order statistics

## Request Examples

### Register User
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Product
```json
POST /api/products
{
  "name": "Cotton Night Suit",
  "description": "Comfortable cotton night suit for women",
  "price": 29.99,
  "images": ["image1.jpg", "image2.jpg"],
  "brand": "brandId",
  "sizes": ["sizeId1", "sizeId2"],
  "colors": ["colorId1", "colorId2"],
  "ageGroups": ["ageGroupId1"],
  "stock": 100
}
```

### Add to Cart
```json
POST /api/cart/add
{
  "productId": "productId",
  "quantity": 2,
  "size": "sizeId",
  "color": "colorId"
}
```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "error": "Detailed error message (in development)"
}
```

## Database Schema

The API uses MongoDB with the following main collections:
- Users
- Products
- Brands
- Sizes
- Colors
- Age Groups
- Banners
- Discounts
- Comments
- Cart
- Orders
- Activities
- Wishlist
- Notifications

## Scalability Features

- Pagination support for product listings
- Efficient database queries with proper indexing
- JWT-based authentication for stateless sessions
- Modular architecture for easy maintenance
- Activity tracking for user behavior analysis

## Future Enhancements

- Payment gateway integration
- Email notifications
- Image upload functionality
- Advanced search and filtering
- Multi-language support
- Analytics and reporting
- Mobile app support 