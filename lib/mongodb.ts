import { MongoClient, MongoClientOptions } from 'mongodb'
import { attachDatabasePool } from '@vercel/functions'

if (!process.env.MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable')
}

const options: MongoClientOptions = {
  appName: 'carhub-app',
  maxIdleTimeMS: 5000,
  maxPoolSize: 10,
  minPoolSize: 2,
}

const client = new MongoClient(process.env.MONGODB_URI, options)

// Attach the client to ensure proper cleanup on function suspension
attachDatabasePool(client)

// Export a module-scoped MongoClient
export default client

export async function connectDB() {
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    return client.db('carhub')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

export async function getDB() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect()
  }
  return client.db('carhub')
}
