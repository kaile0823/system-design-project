import express from 'express';
import { addProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/products', getProducts);
router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Setting updating category function

export default router;
