import express from 'express';
import * as user  from '../controllers/userController.js';

const router = express.Router();

router.get('/users', user.getUsersController);
router.get('/users/:id', user.getUserController);
router.post('/users', user.addUserController);
router.put('/users/:id', user.updateUserController);
router.delete('/users/:id', user.deleteUserController);

router.post('/users/login', user.loginController);
router.post('/users/reset-password', user.resetPasswordController);
router.post('/users/verify-token', user.loginVerifyController);

export default router;
