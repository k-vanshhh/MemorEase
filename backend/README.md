# MemorEase Backend API

A comprehensive REST API built with Express.js and MongoDB for the MemorEase platform.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed locally or MongoDB Atlas account

### Installation

1. Navigate to the backend folder:
\`\`\`bash
cd backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Update `.env` file with your MongoDB URI and other configurations

4. Start the server:
\`\`\`bash
npm run dev
\`\`\`

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile (requires token)
- `PUT /api/auth/me` - Update user profile (requires token)

### Products
- `GET /api/products` - Get all products with pagination
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/featured/top` - Get featured products

### Artists
- `GET /api/artists` - Get all artists
- `GET /api/artists/:id` - Get artist by ID with products
- `GET /api/artists/:id/products` - Get artist's products

### Cart (requires authentication)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders (requires authentication)
- `POST /api/orders/create` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get specific order

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review (requires authentication)

### Search
- `GET /api/search?query=...&category=...&minPrice=...&maxPrice=...&rating=...&sort=...` - Search products with filters

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Frontend URL for CORS
- `NODE_ENV` - Environment (development/production)
