import express from 'express';
import { getProductsController, addProductController, updateProductController, deleteProductController } from '../controllers/productController.js';

const router = express.Router();

router.get('/products', getProductsController);
router.post('/products', addProductController);
router.put('/products/:id', updateProductController);
router.delete('/products/:id', deleteProductController);

export default router;
