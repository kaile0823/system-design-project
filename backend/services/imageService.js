import { promises as fs } from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ADDING

// Adding a new images
export const addImageService = async (productData) => {
    //
};

// GETTING

// Getting image links from server

export const getImageService = async (id) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const folderPath = path.join(__dirname, '..', `/img/${id}`);

    try {
        const files = await fs.readdir(folderPath);
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));
        const result = imageFiles.map(file => `/img/${id}/${file}`);
        console.log('Result:', result);
        return result;
    } catch (err) {
        console.error('Error reading directory:', err);
    }
};

// DELETING

// Deleting a Product by ID from SQLite
export const deleteImageService = async (id) => {
    //
};