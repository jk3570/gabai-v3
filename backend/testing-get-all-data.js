const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://jokogadingan357:AFUN1idU7d7ImLqD@cluster0.q6hd8be.mongodb.net/gabai';

// MongoDB Atlas database name and collection name
const dbName = 'gabai';
const collectionName = 'users';

// Create a new MongoClient instance
const client = new MongoClient(uri);

async function getData() {
  try {
    // Connect to the MongoDB Atlas cluster
    await client.connect();
    
    // Access the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    
    // Query the collection to retrieve all documents
    const cursor = collection.find({ "username" : "yriuwey22"});
    
    // Iterate over the cursor and log each document
    await cursor.forEach(doc => console.log(doc));
    
    // Close the connection
    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the getData function to retrieve and log data
getData();
