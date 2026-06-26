import { MongoClient, MongoClientOptions } from 'mongodb'
import { attachDatabasePool } from '@vercel/functions'

const options: MongoClientOptions = {
  appName: 'carhub-app',
  maxIdleTimeMS: 5000,
  maxPoolSize: 10,
  minPoolSize: 2,
}

let client: MongoClient | null = null

export default function getClient() {
  if (!client) {
    if (!process.env.MONGODB_URI) {
      throw new Error('Missing MONGODB_URI environment variable')
    }
    client = new MongoClient(process.env.MONGODB_URI, options)
    // Attach the client to ensure proper cleanup on function suspension
    attachDatabasePool(client)
  }
  return client
}

export async function connectDB() {
  try {
    const mongoClient = getClient()
    await mongoClient.connect()
    console.log('Connected to MongoDB')
    return mongoClient.db('carhub')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

export async function getDB() {
  const mongoClient = getClient()
  
  // Ensure connection is established
  // MongoDB driver v6+ handles reconnection automatically
  try {
    await mongoClient.connect()
  } catch (error: any) {
    // Connection already established or will be reused
    if (!error.message?.includes('already connected')) {
      throw error
    }
  }
  
  return mongoClient.db('carhub')
}
