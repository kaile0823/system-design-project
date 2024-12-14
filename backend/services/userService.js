
import UserSqliteModel from '../models/userSqliteModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

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
  const token = jwt.sign(
    { id: "kaile0823" }, // Payload: 包含用戶 ID
    "myhardcodedsecretkey123", // 硬編碼密鑰
    { expiresIn: '1d' } // 過期時間設置為 1 天
  );
  return { isEmailValid: true, isPasswordValid: true, token, uname: user.uname };
}

// For auto login with saved token on client
export const loginVerifyService = async (token) => {
  try {
    if(!token) return false;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserSqliteModel.findByPk(decoded.id);
    if (!user) {
      return false;
    }
    return user;
  } catch (error) {
    console.error('Error during login verification:', error);
    return false;
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