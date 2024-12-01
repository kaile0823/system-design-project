import { ProductSqlite } from '../models/productSqliteModel.js';
import { getImagesService } from '../services/imageService.js';

// Getting all Products from SQLite
export const getProductsService = async () => {
    const products = await ProductSqlite.findAll();

    const productsWithImages = await Promise.all(
        products.map(async product => {
            const images = await getImagesService(product.id);
            return { ...product.dataValues, images }; // Combine images with product data
        })
    );

    return productsWithImages;
}

// Adding a new Product to SQLite
export const addProductService = async (productData) => {
    if (!productData.id) {
        productData.ratingScore = 0;
        productData.ratingCount = 0;
    }
    return await ProductSqlite.create(productData);
};

// Updating a Product by ID in SQLite
export const updateProductService = async (id, productData) => {
    const product = await ProductSqlite.update(productData, { where: { id } });
    return product;
};

// Deleting a Product by ID from SQLite
export const deleteProductService = async (id) => {
    return await ProductSqlite.destroy({ where: { id } });
};