import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase} from '../../utils/database';
import { ObjectId } from 'mongodb';

export default async function update(request: NextApiRequest, response :NextApiResponse) {
  if (request.method === 'PUT') {
    const user = request.body.data
    const _id = new ObjectId(user._id)
    const db = await connectToDatabase(process.env.MONGO_URI);
    const users = db.collection('users')
    const userFound = await users.findOne({_id})
    if (!userFound) {
      response.status(400).json({error:`user with id: ${_id} not found`});
    }
    await users.updateOne(
      {
        _id,
      },
      {
        $set: {
          name: user.name,
          image: user.image,
          challenges: user.challenges,
          currentExperience: user.currentExperience,
          experience: user.experience,
          level: user.level,

        },
      },
    );
    response.json(user)
  } else {
    response.status(400).json({ error: 'Wrong request method' });
  }
};