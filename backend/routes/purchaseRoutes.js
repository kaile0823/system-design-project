import express from 'express';
import { purchaseController } from '../controllers/purchaseController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/purchase', authenticate, purchaseController);

export default router;