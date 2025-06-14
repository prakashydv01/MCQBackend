import mongoose from 'mongoose';
import { DB_NAME1, DB_NAME2 } from '../constant.js';

// Create separate connections
const primaryDB = mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME1}`);
const secondaryDB = mongoose.createConnection(`${process.env.MONGODB_URI}/${DB_NAME2}`);

// Connection function
const connectDB = async () => {
  try {
    // Wait for both connections to establish
    await primaryDB.asPromise();
    await secondaryDB.asPromise();
    
    console.log(`🟢 Primary DB connected: ${primaryDB.name}`);
    console.log(`🟢 Secondary DB connected: ${secondaryDB.name}`);
  } catch (error) {
    console.error('❌ DB connection error:', error);
    process.exit(1);
  }
};

export  { connectDB, primaryDB, secondaryDB };