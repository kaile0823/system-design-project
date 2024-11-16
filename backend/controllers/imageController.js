
import { addImageService, getImageService, deleteImageService } from '../services/imageService.js';

// Adding a new images
export const addImages = async (req, res) => {
    try {                
        const images = await addImageService(req.body); 
        res.status(201).json(images);
    } catch (error) {
        res.status(400).json({ error: `Server can't add images: ${error.message}` });
    }
};

// Getting all images
export const getImages = async (req, res) => {
    try {
        const id = req.query.id;
        const imageLinks = await getImageService(id);
        console.log('Return: ');
        console.log(imageLinks);
        res.json(imageLinks);
    } catch (error) {
        res.status(400).json({ error: `Server can't get images: ${error.message}` });
    }
};

// Deleting a Images
export const deleteImages = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteImageService(id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: ` Server can't delete images: ${error.message}` });
    }
};