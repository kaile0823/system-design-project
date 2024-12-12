import express from 'express';
import * as purchase from '../controllers/purchaseController.js';

const router = express.Router();

router.post('/purchase', purchase.purchaseController); 
router.post('/cartPurchase', purchase.cartPurchaseController); 

export default router;