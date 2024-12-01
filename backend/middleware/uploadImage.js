import fs from "fs";
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';

// Determine base path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMG_DIR = path.resolve(__dirname, "../img");

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const imageName = file.originalname.split('.')[0] || "default";
        const imageId = imageName.split('_')[0];
        const uploadPath = path.join(IMG_DIR, imageId);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage }) 