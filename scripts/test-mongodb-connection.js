const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }
  
  console.log('Connecting to MongoDB at:', uri.replace(/:[^:]*@/, ':***@'));

  const client = new MongoClient(uri, {
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: true,
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });

  try {
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');
    
    const db = client.db(process.env.MONGODB_DB || 'branakids');
    const collections = await db.listCollections().toArray();
    console.log('\nCollections in database:', collections.map(c => `- ${c.name}`).join('\n') || 'No collections found');
    
    // Test a simple query
    console.log('\nTesting a simple query...');
    const count = await db.collection('products').countDocuments();
    console.log(`✅ Found ${count} products in the database`);
    
  } catch (error) {
    console.error('\n❌ MongoDB connection error:', error.message);
    console.error('\nTroubleshooting tips:');
    console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
    console.log('2. Verify your MongoDB Atlas connection string');
    console.log('3. Check your internet connection');
    console.log('4. Make sure the database name is correct');
  } finally {
    await client.close();
    process.exit(0);
  }
}

testConnection();
