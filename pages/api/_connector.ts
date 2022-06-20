import { MongoClient } from 'mongodb'

let cacheDb: MongoClient;

export const connectToDatabase = async () => {
  if(cacheDb) {
    return cacheDb
  }
  const client = new MongoClient(process.env.MONGODB_URI || '')
  cacheDb = client
  return await client.connect()
}
