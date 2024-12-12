import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

// Determine base path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMG_DIR = path.resolve(__dirname, "../img");

// Getting array of image names
export const getImagesService = async (id) => {
    const idString = id.toString();
    const dirPath = path.join(IMG_DIR, idString);
    try {
        const files = await fs.promises.readdir(dirPath);
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));
        return imageFiles;
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Deleting a Product by ID from SQLite
export const deleteImageService = async (id) => {

    const dirPath = path.join(IMG_DIR, id);
    try {

        if (!fs.existsSync(dirPath)) {
            throw new Error('File not found');
        }
        await fs.promises.rm(dirPath, { recursive: true, force: true });
        return { success: true, message: 'Folder deleted successfully' };

    } catch (error) {
        return { success: false, error: error.message };
    }
};