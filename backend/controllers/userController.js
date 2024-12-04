
import { addUserService, getUsersService, getUserService, updateUserService, deleteUserService, loginService, resetPasswordService, checkDuplicateService } from '../services/userService.js';
import { validateEmail } from '../utils/emailValidation.js';


// Getting all users based on database type
export const getUsersController = async (req, res) => {
  // const users = await getUsersService();
  // res.json(users);
};

// Getting a specific user
export const getUserController = async (req, res) => {
  // const { id } = req.params;
  // const user = await getUserService(id);
  // if (!user) {
  //   return res.status(404).json({ msg: 'User not found' });
  // }
  // res.json(user);
};

// Adding a new user with duplicate and email validation
export const addUserController = async (req, res) => {

  try {
    const userData = req.body;
    const duplicateResult = await checkDuplicateService(userData.uname, userData.email);
    if (duplicateResult.uname || duplicateResult.email) {
      return res.status(200).json(duplicateResult); // Invalid username or email
    }

    const registerResult = await addUserService(userData);
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
  // const { id } = req.params;
  // const { uname, email, password, address } = req.body;

  // if (!validateEmail(email)) {
  //   return res.status(400).json({ msg: 'Invalid email format' });
  // }

  // const updatedUserData = { uname, email, password, address };
  // const updatedUser = await updateUserService(id, updatedUserData);

  // if (!updatedUser) {
  //   return res.status(404).json({ msg: 'User not found' });
  // }

  // res.json(updatedUser);
};

// Deleting a user
export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  await deleteUserService(id);
  res.sendStatus(204);
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService(email, password);
  // On whatever condition, result will send the status of login to the frontend
  if (result) {
    return res.status(200).json(result);
  }
  return res.status(400).json(result);
}

export const resetPasswordController = async (req, res) => {
  const { email, password } = req.body;
  const result = await resetPasswordService(email, password);
  if (result) {
    return res.sendStatus(200); // Reset password successfully
  }
  return res.sendStatus(400); // Reset password failed
}
