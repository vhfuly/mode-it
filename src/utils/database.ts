import { MongoClient, Collection } from 'mongodb';

interface ConnectType {
  sessions: Collection;
  users: Collection;
  client: MongoClient;
}

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function connect(): Promise<ConnectType> {
  if (!client.isConnected()) await client.connect();

  const sessions = client.db('test_auth').collection('sessions');
  const users = client.db('test_auth').collection('users');
  return { sessions, users, client };
}