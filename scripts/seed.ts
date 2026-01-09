import { MongoClient } from 'mongodb';
import { Product } from '../lib/types';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

const sampleProducts: Omit<Product, '_id' | 'id' | 'lastUpdated'>[] = [
  {
    name: 'Wireless Bluetooth Headphones',
    slug: 'wireless-bluetooth-headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and crystal-clear sound quality.',
    price: 199.99,
    category: 'Electronics',
    inventory: 25,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
  },
  {
    name: 'Smart Watch Pro',
    slug: 'smart-watch-pro',
    description: 'Feature-rich smartwatch with health tracking, GPS, and water resistance. Perfect for active lifestyles.',
    price: 349.99,
    category: 'Electronics',
    inventory: 15,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
  },
  {
    name: 'Organic Cotton T-Shirt',
    slug: 'organic-cotton-t-shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt available in multiple colors. Made with eco-friendly materials.',
    price: 29.99,
    category: 'Clothing',
    inventory: 50,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
  },
  {
    name: 'Leather Backpack',
    slug: 'leather-backpack',
    description: 'Stylish and durable leather backpack with multiple compartments. Perfect for work or travel.',
    price: 129.99,
    category: 'Accessories',
    inventory: 8,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
  },
  {
    name: 'Stainless Steel Water Bottle',
    slug: 'stainless-steel-water-bottle',
    description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 24.99,
    category: 'Accessories',
    inventory: 30,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800',
  },
  {
    name: 'Running Shoes',
    slug: 'running-shoes',
    description: 'Lightweight and breathable running shoes with excellent cushioning and support for long-distance runs.',
    price: 89.99,
    category: 'Footwear',
    inventory: 20,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
  },
  {
    name: 'Wireless Mouse',
    slug: 'wireless-mouse',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life. Perfect for work and gaming.',
    price: 39.99,
    category: 'Electronics',
    inventory: 5,
    imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800',
  },
  {
    name: 'Yoga Mat',
    slug: 'yoga-mat',
    description: 'Non-slip yoga mat with extra cushioning. Eco-friendly and easy to clean.',
    price: 34.99,
    category: 'Fitness',
    inventory: 12,
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
  },
];

async function seedDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('ecommerce');
    const collection = db.collection('products');

    // Clear existing products
    await collection.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const productsWithTimestamps = sampleProducts.map(product => ({
      ...product,
      id: '',
      lastUpdated: new Date().toISOString(),
    }));

    const result = await collection.insertMany(productsWithTimestamps as any);
    console.log(`Inserted ${result.insertedCount} products`);

    // Update products with their IDs
    const insertedProducts = await collection.find({}).toArray();
    for (const product of insertedProducts) {
      await collection.updateOne(
        { _id: product._id },
        { $set: { id: product._id.toString() } }
      );
    }
    console.log('Updated product IDs');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedDatabase();

