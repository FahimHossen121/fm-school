import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  console.log("Connecting to MongoDB...");
  
  if (cached.conn) return cached.conn;

  if (mongoose.connection.readyState === 1) {
    cached.conn = mongoose;
    return cached.conn;
  }

  if (mongoose.connection.readyState === 2) {
    while (mongoose.connection.readyState === 2) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (mongoose.connection.readyState === 1) {
      cached.conn = mongoose;
      return cached.conn;
    }
  }

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

export default connectDB;
