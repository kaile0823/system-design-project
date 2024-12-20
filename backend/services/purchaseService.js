import ProductSqliteModel from '../models/productSqliteModel.js'; // 引入 ProductSqlite 模型
import CartSqliteModel from '../models/cartSqliteModel.js'; // 引入 Cart 模型
import UserSqliteModel from '../models/userSqliteModel.js'; // 引入 User 模型
import PurchaseSqliteModel from '../models/purchaseSqliteModel.js'; // 引入 Purchase 模型

export const purchaseService = async (data) => {
    try {
        data.card_id = 'none'

        const product = await ProductSqliteModel.findByPk(data.item_id);
        if (!product || product.quantity < data.quantity) {
            return { status: false, message: 'Item out of stock' };
        }

        const purchaseResult = PurchaseSqliteModel.create(data);
        if (!purchaseResult) {
            return { status: false, message: 'Purchase failed' };
        }

        const updateResult = await ProductSqliteModel.update({ quantity: product.quantity - data.quantity }, { where: { id: data.item_id } });
        if (!updateResult) {
            return { status: false, message: 'Update failed' };
        }

        return { status: true, message: 'Purchase successful' };
    }
    catch (error) {
        console.error("Error processing purchase:", error);
        return { status: false, message: 'Purchase failed' };
    }
}

export const getPurchaseService = async () => {
    const purchases = await PurchaseSqliteModel.findAll({ include: [UserSqliteModel, ProductSqliteModel] });
    return purchases;
}

export const getUserPurchaseService = async (id) => {
    const purchases = await PurchaseSqliteModel.findAll({ where: { user_id: id }, include: [UserSqliteModel, ProductSqliteModel] });
    return purchases;
}