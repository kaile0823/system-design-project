
import { UserSqlite } from '../models/userSqliteModel.js';

import { addUserSqlite, getUsersSqlite, updateUserSqlite, checkDuplicateSqlite } from '../services/userService.js';
import { validateEmail } from '../utils/emailValidation.js';

// Adding a new user with duplicate and email validation
export const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!validateEmail(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }

  const checkDuplicate = await checkDuplicateSqlite(name, email);
  
  if (checkDuplicate) {
    return res.status(400).json({ msg: 'User with same name or email already exists' });
  }

  const newUser = { name, email, password };
  const createdUser = await addUserSqlite(newUser);
  
  res.status(201).json(createdUser);
};

// Getting all users based on database type
export const getUsers = async (req, res) => {
  const users = await getUsersSqlite();
  res.json(users);
};

// Updating a user with validation
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }

  const updatedUserData = { name, email, password };
  const updatedUser = await updateUserSqlite(id, updatedUserData);

  if (!updatedUser) {
    return res.status(404).json({ msg: 'User not found' });
  }

  res.json(updatedUser);
};