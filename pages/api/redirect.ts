import { MongoClient, ObjectId } from "mongodb";
import { VercelRequest, VercelResponse } from '@vercel/node';

let cacheDb: MongoClient

export const connectToDatabase = async () => {
  if (cacheDb) {
    return cacheDb
  }
  const client = new MongoClient(process.env.MONGODB_URI || '')

  cacheDb = client;
  return await client.connect()
}

export default async (req: VercelRequest, res: VercelResponse) => {
  const db = await connectToDatabase();

  const entry = await db.db('links_db').collection('links_collection').findOne({ _id: new ObjectId(req.query.id as string) });

  if (entry !== null) {
      return res.redirect(301, entry.link);
  }

  return res.redirect(301, '/');
}
