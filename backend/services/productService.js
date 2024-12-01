
import ProductSqlite from '../models/productSqliteModel.js';

// ADDING

// Adding a new Product to SQLite
export const addProductSqlite = async (productData) => {
    // for (let i = 0; i < productData.length; i++) {
    //     const product = productData[i];
    //     await ProductSqlite.create(product);
    // }
    if (!productData.id) {
        productData.ratingScore = 0;
        productData.ratingCount = 0;
    }

    return await ProductSqlite.create(productData);
};

// UPDATING

// Updating a Product by ID in SQLite
export const updateProductSqlite = async (id, productData) => {
    const product = await ProductSqlite.update(productData, { where: { id } });
    return product;
};

// GETTING

// Getting all Products from SQLite
export const getProductSqlite = async () => {
    return await ProductSqlite.findAll();
};

// DELETING

// Deleting a Product by ID from SQLite
export const deleteProductSqlite = async (id) => {
    return await ProductSqlite.destroy({ where: { id } });
};