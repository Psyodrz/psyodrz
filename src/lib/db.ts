import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

console.log('MongoDB URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Hide credentials in logs

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log('Creating new database connection...');
    
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Database connected successfully');
        console.log('MongoDB connection state:', mongoose.connection.readyState);
        // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
        return mongoose;
      })
      .catch((error) => {
        console.error('Database connection error:', error);
        
        // More specific error handling
        if (error.name === 'MongoNetworkError') {
          console.error('MongoDB Network Error: Check if MongoDB is running and accessible');
        } else if (error.name === 'MongoServerSelectionError') {
          console.error('MongoDB Server Selection Error: Cannot connect to any server in the cluster');
        }
        
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Failed to establish database connection:', e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect; 