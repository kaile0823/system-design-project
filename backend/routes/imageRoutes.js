import express from 'express';
import { addImages, getImages, deleteImages } from '../controllers/imageController.js';

const router = express.Router();

router.get('/images', getImages);
router.post('/images', addImages);
router.delete('/images/:id', deleteImages);

export default router;
