
import { checkDuplicateService, addUserService, getUsersService, getUserService, updateUserService, deleteUserService, loginService, resetPasswordService } from '../services/userService.js';
import { validateEmail } from '../utils/emailValidation.js';

// Adding a new user with duplicate and email validation
export const addUserController = async (req, res) => {

  const { uname, email, password, address } = req.body;
  if (!validateEmail(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }

  const checkDuplicate = await checkDuplicateService(uname, email);
  if (checkDuplicate) {
    return res.status(400).json({ msg: 'User with same name or email already exists' });
  }

  const newUser = { uname, email, password, address };
  const createdUser = await addUserService(newUser);
  res.status(201).json(createdUser);
};

// Getting all users based on database type
export const getUsersController = async (req, res) => {
  const users = await getUsersService();
  res.json(users);
};

// Getting a specific user
export const getUserController = async (req, res) => {
  const { id } = req.params;
  const user = await getUserService(id);
  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }
  res.json(user);
};

// Updating a user with validation
export const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { uname, email, password, address } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }

  const updatedUserData = { uname, email, password, address };
  const updatedUser = await updateUserService(id, updatedUserData);

  if (!updatedUser) {
    return res.status(404).json({ msg: 'User not found' });
  }

  res.json(updatedUser);
};

// Deleting a user
export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  await deleteUserService(id);
  res.sendStatus(204);
};


// User login
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const result = await loginService(email, password);
  // On whatever condition, result will send the status of login to the frontend
  res.status(200).json(result);
}

export const resetPasswordController = async (req, res) => {
  const { password } = req.body;
  const result = await resetPasswordService(password);
  if (result) {
    res.status(200); // Reset password successfully
  } else {
    res.status(400); // Reset password failed
  }
}