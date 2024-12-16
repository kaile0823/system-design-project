import express from 'express';
import itemController from '../controllers/itemController.js'; // 引入控制器
import { authenticate } from '../middleware/authMiddleware.js'; // 引入身份驗證中介軟體

const router = express.Router();

// 定義路由
router.get('/getitems', itemController.getItems); // 獲取所有商品的重點資料
router.get('/getitem/:id', itemController.getItem); // 根據商品 ID 獲取詳細資料
router.post('/addcart', authenticate, itemController.addCart); // 添加商品到購物車
router.get('/getcart', authenticate, itemController.getCart); // 獲取使用者的購物車資料
router.post('/checkcart', authenticate, itemController.checkCart); // 檢查購物車中的商品庫存
router.post('/purchase', authenticate, itemController.purchase); // 購買下訂單

export default router;