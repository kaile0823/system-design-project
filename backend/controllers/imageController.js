
import { saveFileService, getImageService, deleteImageService } from '../services/imageService.js';

// Upload new images
export const uploadImage = async (req, res) => {
    try {
      const id = req.body.id || "default"; // Default folder name
      
      if (!req.body.image) {
        return res.status(400).json({ message: "No file uploaded." });
      }
    //   console.log(req.body.image);
      const filePath = await saveFileService(req.body.image, id);
  
      res.status(200).json({
        message: "File uploaded successfully!",
        filePath,
      });
    } catch (error) {
      console.error("Error in uploadImage:", error);
      res.status(500).json({ message: "File upload failed.", error: error.message });
    }
  };

// Getting all images
export const getImages = async (req, res) => {
    try {
        const id = req.query.id;
        const imageLinks = await getImageService(id);
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