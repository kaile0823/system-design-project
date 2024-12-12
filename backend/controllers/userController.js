
import * as user from '../services/userService.js';

// Getting all users based on database type
export const getUsersController = async (req, res) => {
  const users = await user.getUsersService();
  res.json(users);
};

// Getting a specific user
export const getUserController = async (req, res) => {
  const { id } = req.params;
  const result = await user.getUserService(id);
  if (!result) {
    return res.status(404).json({ msg: 'User not found' });
  }
  res.json(result);
};

// Adding a new user with duplicate and email validation
export const addUserController = async (req, res) => {

  try {
    const userData = req.body;
    const duplicateResult = await user.checkDuplicateService(userData.uname, userData.email);
    if (duplicateResult.uname || duplicateResult.email) {
      return res.status(200).json(duplicateResult); // Invalid username or email
    }

    const registerResult = await user.addUserService(userData);
    if (registerResult) {
      return res.status(201).json(registerResult); // Register successfully
    }
    return res.sendStatus(400); // Register failed]
  }
  catch (error) {
    console.log(error);
  }
};

// Updating a user with validation
export const updateUserController = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const oldData = await user.getUserService(id);

  // If email or username is changed
  if (oldData.email !== updatedData.email) {
    {
      const duplicateResult = await user.checkDuplicateService('', updatedData.email);
      if (duplicateResult.email) {
        return res.status(200).json(duplicateResult); // Invalid username or email
      }
    }
  }
  if (oldData.uname !== updatedData.uname) {
    const duplicateResult = await user.checkDuplicateService(updatedData.uname, '');
    if (duplicateResult.uname) {
      return res.status(200).json(duplicateResult); // Invalid username or email
    }
  }

  const updatedUser = await user.updateUserService(id, updatedData);

  if (updatedUser) {
    return res.status(200).json(updatedUser); // Update successfully
  }
  return res.sendStatus(400); // Update failed
};

// Deleting a user
export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  const result = await user.deleteUserService(id);
  if (result) {
    return res.sendStatus(204);
  }
  return res.status(404).json({ msg: 'User not found' });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const result = await user.loginService(email, password);
  // On whatever condition, result will send the status of login to the frontend
  if (result) {
    return res.status(200).json(result);
  }
  return res.status(400).json(result);
}

export const resetPasswordController = async (req, res) => {
  const { email, password } = req.body;
  const result = await user.resetPasswordService(email, password);
  if (result) {
    return res.sendStatus(200); // Reset password successfully
  }
  return res.sendStatus(400); // Reset password failed
}

export const loginVerifyController = async (req, res) => {
  const { token } = req.body;
  const result = await user.loginVerifyService(token);
  if (result) {
    return res.status(200).json(result); // Login successfully
  }
  return res.sendStatus(400); // Login failed
}