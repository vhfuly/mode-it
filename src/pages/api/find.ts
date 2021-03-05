import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase} from '../../utils/database';

export default async function find(request: NextApiRequest, response :NextApiResponse) {
  if (request.method === 'GET') {

    const db = await connectToDatabase(process.env.MONGO_URI);
    const users = db.collection('users')
    const allUsers = await users.find({}).sort({ experience: -1 }).toArray()
    response.json(allUsers)
  } else {
    response.status(400).json({ error: 'Wrong request method' });
  }
};