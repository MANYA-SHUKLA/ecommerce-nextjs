import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please add your Mongo URI to .env.local\n' +
    'For MongoDB Atlas (free): https://www.mongodb.com/cloud/atlas\n' +
    'Format: mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority'
  );
}

const uri: string = process.env.MONGODB_URI;
const options = {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().catch((error) => {
      console.error('MongoDB connection error:', error.message);
      console.error('\n📝 Setup Instructions:');
      console.error('1. For MongoDB Atlas (Recommended):');
      console.error('   - Sign up at https://www.mongodb.com/cloud/atlas');
      console.error('   - Create a free cluster');
      console.error('   - Get your connection string and add it to .env.local as MONGODB_URI');
      console.error('2. For Local MongoDB:');
      console.error('   - Install MongoDB: brew install mongodb-community (macOS)');
      console.error('   - Start MongoDB: brew services start mongodb-community');
      console.error('   - Use: mongodb://localhost:27017/ecommerce');
      throw error;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  try {
    const client = await clientPromise;
    return client.db('ecommerce');
  } catch (error: any) {
    console.error('Failed to get database:', error.message);
    throw new Error(
      'Database connection failed. Please check your MONGODB_URI in .env.local'
    );
  }
}

export default clientPromise;

