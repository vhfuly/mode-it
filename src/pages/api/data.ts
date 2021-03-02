import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';
import { IUser } from '../../types/User';

export default async function data(request: NextApiRequest, response :NextApiResponse) {
  
  const token = request.cookies['next-auth.session-token']
  
  const { sessions, users } = await connect();

  const session = await sessions.findOne({sessionToken: token})
  
  const user: IUser = await users.findOne({_id: session.userId})
   
  if (!user.level) {
    user.level = 1
    user.challenges = 0
    user.experience = 0
    user.currentExperience = 0
    user.

    users.insertOne(user);
  }

  response.json(user);
};

