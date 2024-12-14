import express from 'express';
import { addCartController, getCartController, checkCartController ,removeItemFromCart} from '../controllers/cartController.js'; // 使用默認匯入
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/addcart',  addCartController);
router.get('/getcart', getCartController);
router.post('/checkcart', checkCartController);
router.delete('/removecart/:id',removeItemFromCart);

export default router;