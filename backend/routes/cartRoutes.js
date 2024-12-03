import express from 'express';
import { addCartController, getCartController, checkCartController } from '../controllers/cartController.js'; // 使用默認匯入
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/addcart', authenticate, addCartController);
router.get('/getcart', authenticate, getCartController);
router.post('/checkcart', authenticate, checkCartController);

export default router;