import express from 'express';
import { addUser, getUsers, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', addUser);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);

export default router;
