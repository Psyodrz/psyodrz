import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

// Hide credentials in logs
const sanitizedUri = MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
console.log('MongoDB URI:', sanitizedUri);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached!.conn) {
    console.log('Using cached database connection');
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log('Creating new MongoDB connection...');
    
    // @ts-ignore - Type assertion for mongoose connection
    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      console.log('Connection state:', mongoose.connection.readyState);
      // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
      return mongoose;
    }).catch((error) => {
      console.error('MongoDB connection error:', error);
      
      if (error.name === 'MongoNetworkError') {
        console.error('Network Error: Check if MongoDB is running and accessible');
      } else if (error.name === 'MongoServerSelectionError') {
        console.error('Server Selection Error: Cannot connect to any server in the cluster');
      }
      
      throw error;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    console.error('Failed to establish MongoDB connection:', e);
    throw e;
  }

  return cached!.conn;
}

export default connectDB;
