import express from 'express';
import multer from 'multer';
import { uploadImage, getImages, deleteImages } from '../controllers/imageController.js';

const router = express.Router();
const upload = multer();

router.get('/images', getImages);
router.post('/images', upload.single("image"), uploadImage);
router.delete('/images/:id', deleteImages);

export default router;
