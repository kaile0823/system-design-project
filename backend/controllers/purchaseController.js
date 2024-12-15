import ProductSqliteModel from '../models/productSqliteModel.js'; // 引入 ProductSqlite 模型
import CartSqliteModel from '../models/cartSqliteModel.js'; // 引入 Cart 模型
import purchaseSqliteModel from '../models/purchaseSqliteModel.js'; // 引入 Purchase 模型
import * as purchase from '../services/purchaseService.js';

// 直接購買
export const purchaseController = async (req, res) => {
    const data = req.body;
    try {
        const result = await purchase.purchaseService(data);
        if (result.status) {
            return res.sendStatus(201);
        }
        return res.status(400).json({ error: ` Server can't purchase Product: ${result.message}` });
    }
    catch (error) {
        console.log(error);
    }
}


// 購買下訂單
export const cartPurchaseController = async (req, res) => {
    try {
        const { userId } = req.body;
        const cartItems = await CartSqliteModel.findAll({ where: { user_id: userId } });

        // 檢查庫存
        for (let item of cartItems) {
            const product = await ProductSqliteModel.findByPk(item.item_id);
            if (!product || product.quantity < item.quantity) {
                return res.status(400).json({ message: `Item ${product ? product.name : ''} is out of stock` });
            }
        }
        const data = await Promise.all(
            cartItems.map(async (item) => {
              // 查詢商品詳細信息
              const product = await ProductSqliteModel.findByPk(item.item_id);
          
              if (!product) {
                throw new Error(`Product with ID ${item.item_id} not found`);
              }
          
              // 構建每個商品的購買記錄
              return {
                user_id: item.user_id,        // 用戶 ID
                item_id: item.item_id,        // 商品 ID
                quantity: item.quantity,      // 購買數量
              };
            })
          );
        //新增購買結果
        const purchaseResult = await purchaseSqliteModel.bulkCreate(data);
        if (!purchaseResult) {
            return { status: false, message: 'Purchase failed' };
        }

        // 更新庫存和清空購物車
        for (let item of cartItems) {
            const product = await ProductSqliteModel.findByPk(item.item_id);
            await product.update({ quantity: product.quantity - item.quantity });
        }

        await CartSqliteModel.destroy({ where: { user_id: userId } });

        console.error('purchase completed');

        res.status(200).json({ message: 'Purchase completed' });
    } catch (error) {
        console.error("Error processing purchase:", error);
        res.status(500).json({ message:"Error processing purchase:" });
    }
}