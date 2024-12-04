
import UserSqliteModel from '../models/userSqliteModel.js';

// API SERVICES

// Getting all users from SQLite
export const getUsersService = async () => {
  try { return await UserSqliteModel.findAll(); }
  catch (error) {
    console.error('Error during getting users:', error);
  };
};

// Getting a user by uname from SQLite
export const getUserService = async (id) => {
  try { return await UserSqliteModel.findByPk(id); }
  catch (error) {
    console.error('Error during getting user:', error);
  };
}

// Adding a new user to SQLite
export const addUserService = async (userData) => {
  try {
    return await UserSqliteModel.create(userData);
  }
  catch (error) {
    console.error('Error during adding user:', error);
  };
};

// Updating a user by ID in SQLite
export const updateUserService = async (id, userData) => {
  try { return await UserSqliteModel.update(userData, { where: { id } }); }
  catch (error) {
    console.error('Error during updating user:', error);
  };
}

// Deleting a user by ID from SQLite
export const deleteUserService = async (id) => {
  try { return await UserSqliteModel.destroy({ where: { id } }); }
  catch (error) {
    console.error('Error during deleting user:', error);
  };
};

// UTILITIES SERVICES

// Validation for duplicate email and name in SQLite
export const checkDuplicateService = async (uname, email) => {
  try {
    const isUserExist = await UserSqliteModel.findOne({ where: { uname } });
    const isEmailExist = await UserSqliteModel.findOne({ where: { email } });
    const result = {
      uname: isUserExist ? true : false,
      email: isEmailExist ? true : false,
    };

    return result;
  }
  catch (error) {
    console.error('Error during duplicate check:', error);
  };
}

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
    return { isEmailValid: true, isPasswordValid: true, token, uname: user.uname };
  } catch (error) {
    console.error('Error during login:', error);
    return { isEmailValid: false, isPasswordValid: false };
  }
}

export const resetPasswordService = async (email, password) => {
  try {
    const user = await UserSqliteModel.findOne({ where: { email } });
    if (!user) {
      return false;
    }
    user.password = password;
    await user.save();
    return true
  } catch (error) {
    console.error('Error during password reset:', error);
    return false;
  }
}