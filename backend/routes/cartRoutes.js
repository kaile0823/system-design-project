import express from 'express';
import { addCartController, getCartController, checkCartController ,removeItemFromCart} from '../controllers/cartController.js'; // 使用默認匯入
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/addcart',  addCartController);
router.post('/getcart', getCartController);
router.post('/checkcart', checkCartController);
router.post('/removecart',removeItemFromCart);

export default router;