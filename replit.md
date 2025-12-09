# AuraHome - Premium Home Decor E-Commerce Platform

## Overview

AuraHome is a full-stack e-commerce platform for premium home decor, scented candles, and gift products. The application follows a modern React + Express architecture with PostgreSQL database storage, designed to deliver a premium shopping experience with features like product browsing, collections, shopping cart, checkout, and an admin dashboard for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: React Query for server state, React Context for local state (Cart, Theme)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for premium aesthetic
- **Build Tool**: Vite with path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful JSON API under /api/* routes
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Build**: esbuild for production bundling with selective dependency bundling

### Data Layer
- **Database**: PostgreSQL (required via DATABASE_URL environment variable)
- **Schema Location**: shared/schema.ts (shared between frontend and backend)
- **Migrations**: Drizzle Kit with migrations output to ./migrations
- **Key Entities**: Users, Products, Collections, CartItems, Orders, OrderItems, Banners

### Design System
- Premium home decor aesthetic inspired by AuraDecor.co.in
- Typography: Playfair Display (serif headers), DM Sans (body text)
- Color system using CSS custom properties with light/dark mode support
- Image-first design with generous whitespace

### Application Routes
**Customer-facing:**
- `/` - Homepage with hero, featured products, collections
- `/shop` - Product catalog with filtering/sorting
- `/collections` - Browse all collections
- `/collections/:slug` - Individual collection page
- `/new-arrivals` - New products
- `/sale` - Discounted products
- `/checkout` - Order checkout flow

**Admin:**
- `/admin` - Dashboard
- `/admin/products` - Product management
- `/admin/collections` - Collection management
- `/admin/orders` - Order management
- `/admin/banners` - Banner/promotion management

### API Endpoints
All endpoints prefixed with `/api`:
- Products: GET/POST /products, GET/PUT/DELETE /products/:id
- Collections: GET/POST /collections, GET/PUT/DELETE /collections/:id
- Cart: GET/POST/PUT/DELETE cart operations by session
- Orders: GET/POST orders with items
- Banners: GET/POST /banners for promotional content

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via DATABASE_URL environment variable
- **connect-pg-simple**: Session storage in PostgreSQL

### UI/Component Libraries
- **Radix UI**: Headless component primitives (dialog, dropdown, select, etc.)
- **shadcn/ui**: Pre-styled component collection
- **Embla Carousel**: Product image carousels
- **Lucide React**: Icon library
- **React Icons**: Social media icons (Facebook, Instagram, etc.)

### Form Handling & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation (shared between frontend and backend)
- **@hookform/resolvers**: Zod resolver for React Hook Form
- **drizzle-zod**: Generate Zod schemas from Drizzle tables

### Development Tools
- **Vite**: Frontend dev server and bundler
- **TSX**: TypeScript execution for development
- **Drizzle Kit**: Database migrations and schema push

### Replit-specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicator