
import { addProductService, getProductsService, updateProductService, deleteProductService } from '../services/productService.js';

// Getting all Products
export const getProductsController = async (req, res) => {
    try {
        const products = await getProductsService();
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: `Server can't get Products: ${error.message}` });
    }
};


// Adding a new Product
export const addProductController = async (req, res) => {
    try {
        const product = await addProductService(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: `Server can't add Product: ${error.message}` });
    }
};


// Updating a Product
export const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        // remove images properties in body
        const data = req.body;
        if (data.images) {
            delete data.images;
        }
        console.log(data);
        const product = await updateProductService(id, data);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: ` Server can't update Product: ${error.message}` });
    }
};

// Deleting a Product
export const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteProductService(id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: ` Server can't delete Product: ${error.message}` });
    }
};