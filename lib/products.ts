import { getDb } from './db';
import { Product } from './types';
import { ObjectId } from 'mongodb';

export async function getAllProducts(): Promise<Product[]> {
  const db = await getDb();
  const products = await db.collection<Product>('products').find({}).toArray();
  return products.map(({ _id, ...p }) => ({
    ...p,
    id: _id?.toString() || p.id,
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = await getDb();
  const product = await db.collection<Product>('products').findOne({ slug });
  if (!product) return null;
  const { _id, ...rest } = product;
  return {
    ...rest,
    id: _id?.toString() || product.id,
  };
}

export async function getProductById(id: string): Promise<Product | null> {
  const db = await getDb();
  const product = await db.collection<Product>('products').findOne({ 
    _id: new ObjectId(id) 
  });
  if (!product) return null;
  const { _id, ...rest } = product;
  return {
    ...rest,
    id: _id?.toString() || product.id,
  };
}

export async function createProduct(product: Omit<Product, '_id' | 'id' | 'lastUpdated'>): Promise<Product> {
  const db = await getDb();
  const newProduct: Omit<Product, '_id' | 'id'> = {
    ...product,
    id: '',
    lastUpdated: new Date().toISOString(),
  };
  const result = await db.collection('products').insertOne(newProduct as any);
  return {
    ...newProduct,
    id: result.insertedId.toString(),
  };
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const db = await getDb();
  const updateData: any = {
    ...updates,
    lastUpdated: new Date().toISOString(),
  };
  delete updateData._id;
  delete updateData.id;
  
  const result = await db.collection('products').updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
  
  if (result.matchedCount === 0) return null;
  
  // Fetch the updated product
  const updatedProduct = await db.collection<Product>('products').findOne({ 
    _id: new ObjectId(id) 
  });
  
  if (!updatedProduct) return null;
  
  const { _id, ...rest } = updatedProduct;
  return {
    ...rest,
    id: _id?.toString() || id,
  };
}

export async function getInventoryStats() {
  const db = await getDb();
  const products = await db.collection<Product>('products').find({}).toArray();
  
  const totalProducts = products.length;
  const totalInventory = products.reduce((sum, p) => sum + p.inventory, 0);
  const lowStockProducts = products.filter(p => p.inventory < 10).length;
  const outOfStockProducts = products.filter(p => p.inventory === 0).length;
  
  return {
    totalProducts,
    totalInventory,
    lowStockProducts,
    outOfStockProducts,
    products: products.map(({ _id, ...p }) => ({
      ...p,
      id: _id?.toString() || p.id,
    })),
  };
}

