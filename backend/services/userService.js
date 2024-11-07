
import { UserSqlite } from '../models/userSqliteModel.js';

// ADDING

// Adding a new user to SQLite
export const addUserSqlite = async (userData) => {
  return await UserSqlite.create(userData);
};

// UPDATING

// Updating a user by ID in SQLite
export const updateUserSqlite = async (id, userData) => {
  const user = await UserSqlite.findByPk(id);
  return user ? await user.update(userData) : null;
};

// GETTING

// Getting all users from SQLite
export const getUsersSqlite = async () => {
  return await UserSqlite.findAll();
};

export const findUserByEmailSqlite = async (email) => {
  return await UserSqlite.findOne({ where: { email } });
};

// Validation for duplicate email and name in SQLite
export const checkDuplicateSqlite = async (name, email) => {
  const userByName = await UserSqlite.findOne({ where: { name } });
  const userByEmail = await UserSqlite.findOne({ where: { email } });
  return userByName || userByEmail;
};