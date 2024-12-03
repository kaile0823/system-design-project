import express from 'express';
import { getUsersController, getUserController, addUserController, updateUserController, deleteUserController } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsersController);
router.get('/users/:id', getUserController);
router.post('/users', addUserController);
router.put('/users/:id', updateUserController);
router.delete('/users/:id', deleteUserController);

export default router;
