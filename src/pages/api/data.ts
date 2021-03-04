import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase} from '../../utils/database';
import { IUser } from '../../types/User';

export default async function data(request: NextApiRequest, response :NextApiResponse) {
  if (request.method === 'GET') {
    const token = request.cookies['next-auth.session-token']
    const db = await connectToDatabase(process.env.MONGO_URI);
    const sessions = db.collection('sessions');
      const users = db.collection('users');

    const session = await sessions.findOne({sessionToken: token})
    
    const user: IUser = await users.findOne({_id: session.userId})
    if (!user.level) {
      user.level = 1
      user.challenges = 0
      user.experience = 0
      user.currentExperience = 0
      
      
      await users.updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            level: user.level,
            challenges: user.challenges,
            experience: user.experience,
            currentExperience: user.currentExperience,
          },
        },
      );
    }

    response.json(user);
  } else {
    response.status(400).json({ error: 'Wrong request method' });
  }
};

