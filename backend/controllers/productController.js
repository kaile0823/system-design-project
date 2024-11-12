
import { addProductSqlite, getProductSqlite, updateProductSqlite, deleteProductSqlite } from '../services/productService.js';

// Adding a new Product
export const addProduct = async (req, res) => {
    try {                
        const product = await addProductSqlite(req.body); 
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: `Server can't add Product: ${error.message}` });
    }
};

// Getting all Products
export const getProducts = async (req, res) => {
    try {
        const products = await getProductSqlite();
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: `Server can't get Products: ${error.message}` });
    }
};

// Updating a Product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await updateProductSqlite(id, req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: ` Server can't update Product: ${error.message}` });
    }
};

// Deleting a Product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteProductSqlite(id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: ` Server can't delete Product: ${error.message}` });
    }
};