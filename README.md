# HandOFine - Premium Home Decor E-Commerce Platform

A full-stack e-commerce platform for premium home decor, scented candles, and gift products.

## Features

- Product browsing with filtering and sorting
- Collections for organized product categories
- Shopping cart with session management
- Checkout flow with order creation
- Admin dashboard for managing products, collections, orders, and banners
- Light/Dark theme support
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS
- shadcn/ui components
- React Query for data fetching
- Wouter for routing

### Backend
- Node.js with Express
- TypeScript
- Drizzle ORM
- PostgreSQL database

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## Local Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd handofine
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/handofine
SESSION_SECRET=your-session-secret-here
```

Replace:
- `username` - your PostgreSQL username
- `password` - your PostgreSQL password
- `localhost:5432` - your PostgreSQL host and port
- `handofine` - your database name

### 4. Set Up the Database

Create the database:

```bash
createdb handofine
```

Push the schema to the database:

```bash
npm run db:push
```

### 5. Seed the Database (Optional)

To populate the database with sample products and collections:

```bash
npx tsx server/seed.ts
```

### 6. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── pages/          # Page components
│   └── index.html
├── server/                 # Backend Express server
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Database operations
│   └── seed.ts             # Database seeding script
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Drizzle database schema
├── attached_assets/        # Static assets (images)
└── migrations/             # Database migrations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio for database management

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Collections
- `GET /api/collections` - Get all collections
- `GET /api/collections/:slug` - Get collection by slug
- `POST /api/collections` - Create collection (admin)
- `PUT /api/collections/:id` - Update collection (admin)
- `DELETE /api/collections/:id` - Delete collection (admin)

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get all orders (admin)
- `POST /api/orders` - Create new order

### Banners
- `GET /api/banners` - Get all banners
- `POST /api/banners` - Create banner (admin)

## Application Routes

### Customer Pages
- `/` - Homepage
- `/shop` - Product catalog
- `/collections` - All collections
- `/collections/:slug` - Individual collection
- `/new-arrivals` - New products
- `/sale` - Products on sale
- `/checkout` - Checkout page

### Admin Pages
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/collections` - Collection management
- `/admin/orders` - Order management
- `/admin/banners` - Banner management

## Contact

- Phone: +91 8867692183
- Email: info@handofinegifts.com
- Address: First Floor, 222 Old No.87 Basement, Village Neb Sarai, New Delhi, South Delhi, Delhi, 110068

## License

This project is proprietary software. All rights reserved.
