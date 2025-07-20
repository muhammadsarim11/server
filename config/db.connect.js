
import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    console.log('Environment check:', {
      hasMongoUri: !!mongoUri,
      nodeEnv: process.env.NODE_ENV
    });
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default ConnectDB;
