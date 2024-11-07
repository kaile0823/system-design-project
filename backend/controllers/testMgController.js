
import { UserMongo } from '../models/userMongoModel.js';


// Sample controller for fetching users from MongoDB
export const getUsersMongo = async (req, res) => {
    const users = await UserMongo.find();
    res.json(users);
  };