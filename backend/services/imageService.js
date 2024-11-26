import { promises as fs } from 'fs';
import fsis from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ADDING

// Adding a new images
// export const addImageService = async (id, file) => {
//     try {
//         const filePath = path.join(__dirname, '..', `/img/${id}/image_${Date.now()}.jpg`);
//         const writeStream = fsp.createWriteStream(filePath);
//         file.pipe(writeStream);
//         return 'Image uploaded successfully';
//     }
//     catch (error) {
//         console.error("Server can't write images: ", error);
//     }
// };

export const saveFileService = async (file, id) => {
    try {
        // const __filename = fileURLToPath(import.meta.url);
        // const __dirname = dirname(__filename)
        // const folderPath = path.join(__dirname, '..', `/img/${id}/`);

        // fs.access(folderPath)
        //     .then(() => {
        //         console.log("Folder exists:", folderPath);
        //     })
        //     .catch(() => {
        //         console.log("Folder does not exist. Creating it...");
        //         fs.mkdir(folderPath, { recursive: true })
        //             .then(() => console.log("Folder created:", folderPath))
        //             .catch((err) => console.error("Error creating folder:", err));
        //     });

        // const filePath = path.join(folderPath, `${Date.now()}_.jpg`);
        // // fsis.writeFileSync(filePath, file.buffer); // Save file data to the disk
        // await fs.writeFile(filePath, file);
        // return filePath;
        console.log(file.path, 'filesasa');
        // Determine base path
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const folderPath = path.join(__dirname, "..", "img", id);

        // Ensure the folder exists
        await fs.mkdir(folderPath, { recursive: true });

        // Define the file path
        const fileName = `${Date.now()}.jpg`;
        const filePath = path.join(folderPath, fileName);

        // Check if the file is an image object
        if (file.path) {
            // If it's a Multer file with a path, move it
            await fs.copyFile(file.path, filePath);
        } else if (file.buffer) {
            // If it contains a buffer, save the buffer
            await fs.writeFile(filePath, file.buffer);
        } else {
            throw new Error("Unsupported file type. Provide an image with a valid path or buffer.");
        }

        console.log("Image saved successfully:", filePath);
        return filePath;
    }
    catch (error) {
        console.error("Server can't write images: ", error);
    }
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