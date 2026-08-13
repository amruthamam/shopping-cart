# FreshBasket — Full-Stack E-Commerce App

A full-stack e-commerce project built with React, TypeScript, Node.js, Express, MongoDB, and JWT authentication.

## Features
- User registration and login
- Product listing and search
- Product categories and filters
- Product detail view
- Wishlist
- Shopping cart
- Checkout flow
- Order history
- Admin dashboard
- Product CRUD
- Responsive design

## Tech Stack
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT

## Project Structure
- src/ — frontend React app
- server/ — Express API and MongoDB models

## Getting Started

1. Install dependencies:
   npm install

2. Create a .env file based on .env.example
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/freshbasket
   JWT_SECRET=freshbasket-secret

3. Start the app:
   npm run dev

4. Frontend URL:
   http://localhost:5173

5. API URL:
   http://localhost:5000/api

## API Routes
- POST /api/auth/register
- POST /api/auth/login
- GET /api/products
- GET /api/products/:id
- POST /api/orders
- GET /api/orders/my-orders

## Notes
This project is designed as a strong portfolio app and can be extended with a proper admin dashboard, payments, and deployment configuration.
