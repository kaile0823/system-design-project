// backend/routes/itemRoutes.js

import express from 'express';
import itemController from '../controllers/itemController.js'; // 使用默認匯入
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// 公開路由
router.get('/getitems', itemController.getItems);
router.get('/getitem/:id', itemController.getItem);

// 受保護路由
router.post('/addcart', authenticate, itemController.addCart);
router.get('/getcart', authenticate, itemController.getCart); // 添加 authenticate
router.post('/checkcart', authenticate, itemController.checkCart); // 添加 authenticate
router.post('/purchase', authenticate, itemController.purchase); // 添加 authenticate

export default router;