import mongoose from 'mongoose';
import { DB_NAME1, DB_NAME2 } from '../constant.js';

// Atlas-optimized connection options
const connectionOptions = {
  serverSelectionTimeoutMS: 30000, // 30 seconds for initial connection
  socketTimeoutMS: 45000,         // 45 seconds for query operations
  connectTimeoutMS: 30000,        // 30 seconds for connection establishment
  maxPoolSize: 10,                // Limit connection pool size
  minPoolSize: 2,                 // Maintain minimum connections
  retryWrites: true,              // Enable retry for write operations
  retryReads: true,               // Enable retry for read operations
  heartbeatFrequencyMS: 10000,    // Send pings every 10 seconds
  waitQueueTimeoutMS: 20000,      // Wait 20s for available connection
  compressors: ['zstd', 'snappy'] // Enable compression
};

// Create robust connections with event listeners
const createRobustConnection = (uri, dbName) => {
  const conn = mongoose.createConnection(uri, connectionOptions);
  
  // Event listeners for monitoring
  conn.on('connected', () => 
    console.log(`🟢 ${dbName} connected successfully`));
  
  conn.on('error', (err) => 
    console.error(`❌ ${dbName} connection error:`, err));
  
  conn.on('disconnected', () => 
    console.warn(`⚠️ ${dbName} disconnected`));
  
  conn.on('reconnected', () => 
    console.log(`🔵 ${dbName} reconnected`));
  
  return conn;
};

// Create connections
const primaryDB = createRobustConnection(
  `${process.env.MONGODB_URI}/${DB_NAME1}`,
  DB_NAME1
);

const secondaryDB = createRobustConnection(
  `${process.env.MONGODB_URI}/${DB_NAME2}`,
  DB_NAME2
);

// Enhanced connection function with health checks
const connectDB = async () => {
  try {
    // Verify both connections with timeout
    await Promise.race([
      Promise.all([
        primaryDB.asPromise(),
        secondaryDB.asPromise()
      ]),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 30000)
      )
    ]);
    
    console.log(`🟢 Primary DB readyState: ${primaryDB.readyState}`);
    console.log(`🟢 Secondary DB readyState: ${secondaryDB.readyState}`);
    
    // Verify collections exist
    await primaryDB.db.listCollections().toArray();
    await secondaryDB.db.listCollections().toArray();
    
  } catch (error) {
    console.error('❌ DB connection failed:', error);
    
    // Graceful shutdown with cleanup
    await Promise.allSettled([
      primaryDB.close(),
      secondaryDB.close()
    ]);
    
    process.exit(1);
  }
};

// Periodic connection health check (optional)
setInterval(() => {
  console.log('Connection health check:');
  console.log(`Primary DB state: ${primaryDB.readyState} (1 = connected)`);
  console.log(`Secondary DB state: ${secondaryDB.readyState}`);
}, 300000); // Every 5 minutes

export { connectDB, primaryDB, secondaryDB };