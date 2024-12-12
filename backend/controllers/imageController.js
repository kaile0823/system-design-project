
import { getImagesService, deleteImageService } from '../services/imageService.js';

export const getImagesController = async (req, res) => {
  try {
    const id = req.params.id;
    const images = await getImagesService(id);
    res.json(images);
  } catch (error) {
    res.status(400).json({ error: ` Server can't get images: ${error.message}` });
  }
}

// Adding a image
export const uploadImageController = async (req, res) => {
  res.status(200).send('File uploaded successfully');
}

// Deleting a image
export const deleteImagesController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteImageService(id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: ` Server can't delete images: ${error.message}` });
  }
};

// Image conventions:

// 1. images saved as /img/id/id_offset.jpg