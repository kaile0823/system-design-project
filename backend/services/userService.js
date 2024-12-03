
import UserSqliteModel from '../models/userSqliteModel.js';

// UTILITIES SERVICES

// Validation for duplicate email and name in SQLite
export const checkDuplicateService = async (name, email) => {
  const userByName = await UserSqliteModel.findOne({ where: { name } });
  const userByEmail = await UserSqliteModel.findOne({ where: { email } });

  console.log(userByName, userByEmail);

  return userByName || userByEmail;
};
export const findUserByEmailService = async (email) => {
  return await UserSqliteModel.findOne({ where: { email } });
};

// API SERVICES

// Getting all users from SQLite
export const getUsersService = async () => {
  return await UserSqliteModel.findAll();
};

// Getting a user by uname from SQLite
export const getUserService = async (id) => {
  return await UserSqliteModel.findByPk(id);
};

// Adding a new user to SQLite
export const addUserService = async (userData) => {
  return await UserSqliteModel.create(userData);
};

// Updating a user by ID in SQLite
export const updateUserService = async (id, userData) => {
  return await UserSqliteModel.update(userData, { where: { id } });
};

// Deleting a user by ID from SQLite
export const deleteUserService = async (id) => {
  return await UserSqliteModel.destroy({ where: { id } });
};


// User login
export const loginService = async (email, password) => {
  try {
    const user = await UserSqliteModel.findOne({ where: { email } });

    if (!user) {
      return { isEmailValid: false, isPasswordValid: false };
    }

    if (user.password !== password) {
      return { isEmailValid: true, isPasswordValid: false };
    }

    // Generate a token (example: using a library like jsonwebtoken)
    const token = "exampleGeneratedToken"; // Replace with your token generation logic
    return { isEmailValid: true, isPasswordValid: true, token };
  } catch (error) {
    console.error('Error during login:', error);
    return { isEmailValid: false, isPasswordValid: false };
  }
}

export const resetPasswordService = async (password) => {
  try {
    await UserSqliteModel.update({ password }, { where: { id: 1 } });
    return true; // Password reset successfully
  } catch (error) {
    console.error('Error during password reset:', error);
    return false; // Password reset failed
  }
}