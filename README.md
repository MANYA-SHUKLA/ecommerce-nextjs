# E-Commerce Product Catalog

A modern, full-featured e-commerce product catalog built with Next.js 15, TypeScript, Tailwind CSS 4, and MongoDB. This application demonstrates multiple Next.js rendering strategies across different pages.

## 🚀 Features

- **Multiple Rendering Strategies**: SSG, ISR, SSR, and Client-Side Rendering
- **Beautiful UI**: Modern design with animations, hover effects, and responsive layout
- **Product Management**: Full CRUD operations for products
- **Real-time Inventory**: Live inventory tracking and statistics
- **Search & Filter**: Client-side search and category filtering
- **Admin Panel**: Protected admin interface for product management
- **Server Components**: Hybrid server/client component architecture

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   
   ADMIN_API_KEY=your-secret-admin-key-here
   ```

4. **Seed the database** (optional):
   ```bash
   npm run seed
   ```
   This will populate the database with sample products.

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ecommerce-nextjs/
├── app/
│   ├── api/
│   │   └── products/
│   │       ├── route.ts              # GET, POST /api/products
│   │       ├── [slug]/route.ts       # GET /api/products/[slug]
│   │       └── [id]/route.ts         # PUT /api/products/[id]
│   ├── products/
│   │   └── [slug]/
│   │       ├── page.tsx              # Product Detail (ISR)
│   │       └── not-found.tsx
│   ├── dashboard/
│   │   └── page.tsx                  # Inventory Dashboard (SSR)
│   ├── admin/
│   │   └── page.tsx                  # Admin Panel (Client-Side)
│   ├── recommendations/
│   │   └── page.tsx                  # Recommendations (Server Components)
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home Page (SSG)
│   └── globals.css                   # Global styles
├── components/
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── SearchAndFilter.tsx
│   └── RecommendedProducts.tsx
├── lib/
│   ├── db.ts                         # MongoDB connection
│   ├── products.ts                   # Product data functions
│   └── types.ts                      # TypeScript types
├── scripts/
│   └── seed.ts                       # Database seeding script
└── README.md
```

## 🎨 Rendering Strategies

### 1. Home Page (`/`) - Static Site Generation (SSG)
- **Strategy**: `force-static`
- **Data Fetching**: At build time
- **Why**: The product catalog doesn't change frequently, so pre-rendering at build time provides the best performance and SEO benefits.
- **Implementation**: Uses `export const dynamic = 'force-static'` to ensure static generation.

### 2. Product Detail Page (`/products/[slug]`) - Incremental Static Regeneration (ISR)
- **Strategy**: ISR with 60-second revalidation
- **Data Fetching**: Pre-generated at build time, regenerated every 60 seconds
- **Why**: Product details like prices and inventory change occasionally. ISR provides static performance while keeping data fresh.
- **Implementation**: Uses `export const revalidate = 60` to regenerate pages every 60 seconds.

### 3. Inventory Dashboard (`/dashboard`) - Server-Side Rendering (SSR)
- **Strategy**: `force-dynamic`
- **Data Fetching**: On every request
- **Why**: Inventory data needs to be always up-to-date for accurate reporting. SSR ensures fresh data on every visit.
- **Implementation**: Uses `export const dynamic = 'force-dynamic'` to force server-side rendering.

### 4. Admin Panel (`/admin`) - Client-Side Rendering
- **Strategy**: Client-side with API calls
- **Data Fetching**: In the browser using `useEffect` and `fetch`
- **Why**: Admin operations require interactivity and real-time feedback. Client-side rendering provides a responsive user experience.
- **Implementation**: Uses `'use client'` directive and React hooks for data fetching.

### 5. Recommendations Page (`/recommendations`) - React Server Components
- **Strategy**: Hybrid server/client components
- **Data Fetching**: Server-side for product list, client-side for interactivity
- **Why**: Demonstrates the modern App Router architecture where server components fetch data and client components handle interactivity.
- **Implementation**: Server component fetches data, passes to client component for interactive features.

## 🔐 API Routes

### GET `/api/products`
Fetch all products.

### GET `/api/products/[slug]`
Fetch a single product by slug.

### POST `/api/products`
Create a new product. Requires `x-api-key` header.

**Request Body**:
```json
{
  "name": "Product Name",
  "slug": "product-slug",
  "description": "Product description",
  "price": 99.99,
  "category": "Category",
  "inventory": 10
}
```

### PUT `/api/products/[id]`
Update an existing product. Requires `x-api-key` header.

**Request Body**:
```json
{
  "price": 89.99,
  "inventory": 5
}
```

## 🗄️ Database Setup

### Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/ecommerce`

### MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Add it to `.env.local` as `MONGODB_URI`

## 📊 Data Model

```typescript
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated: string;
  imageUrl?: string;
}
```

## 🎯 Usage

1. **Browse Products**: Visit the home page to see all products with search and filter capabilities.
2. **View Details**: Click on any product to see detailed information (ISR page).
3. **Check Inventory**: Visit the dashboard to see real-time inventory statistics (SSR page).
4. **Manage Products**: Use the admin panel to create, edit, and manage products (Client-side page).
5. **Get Recommendations**: Check the recommendations page for curated product suggestions (Server Components).

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables for Production

Make sure to set the following environment variables in your hosting platform:
- `MONGODB_URI`
- `ADMIN_API_KEY`

## 🛡️ Security

- Admin API routes are protected with API key authentication
- Environment variables are used for sensitive data
- Input validation on API routes

## 📝 Notes

- The application uses Next.js 15 with the App Router
- Tailwind CSS 4 is used for styling
- All images are loaded from external URLs (Unsplash, Picsum)
- The application is fully responsive and works on all device sizes

## 🤝 Contributing

This is a demonstration project. Feel free to use it as a starting point for your own projects!

## 📄 License

This project is open source and available for educational purposes.

