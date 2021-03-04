import { MongoClient, Collection, Db } from 'mongodb';

interface ConnectType {
  sessions: Collection;
  users: Collection;
  client: MongoClient;
}

let cachedDb: Db = null;

export async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('test_auth')
  cachedDb = db;

  return db;
}
