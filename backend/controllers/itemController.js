const Item = require('../models/item'); // 引入 Item 模型
const Cart = require('../models/cart'); // 引入 Cart 模型

// 獲取所有商品的重點資料
exports.getItems = async (req, res) => {
    try {
        const items = await Item.findAll({
            attributes: ['id', 'name', 'price', 'image_url'] // 查詢特定欄位
        });
        res.json(items); // 回傳商品列表
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: 'Error fetching items' });
    }
};

// 根據商品 ID 獲取商品詳細資料
exports.getItem = async (req, res) => {
    const itemId = req.params.id; // 取得 URL 中的商品 ID
    try {
        const item = await Item.findByPk(itemId); // 根據主鍵（ID）查詢商品
        if (item) {
            res.json(item); // 若找到，回傳商品資料
        } else {
            res.status(404).json({ message: 'Item not found' }); // 若無商品，回傳 404 錯誤
        }
    } catch (error) {
        console.error("Error fetching item:", error);
        res.status(500).json({ message: 'Error fetching item' });
    }
};

// 添加商品到購物車
exports.addCart = async (req, res) => {
    // 確保中介軟體已驗證並設置了 req.user
    const userId = req.user.id; // 從中介軟體中取得使用者 ID
    const { itemId, quantity } = req.body; // 從請求中取得商品 ID 和數量

    try {
        // 新增購物車資料
        await Cart.create({ user_id: userId, item_id: itemId, quantity });
        res.status(201).json({ message: 'Item added to cart' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Error adding item to cart' });
    }
};

// 獲取使用者的購物車資料
exports.getCart = async (req, res) => {
    const userId = req.user.id; // 確定使用者 ID

    try {
        const cartItems = await Cart.findAll({
            where: { user_id: userId },
            include: [{ model: Item, attributes: ['name', 'price', 'image_url'] }] // 包含商品資訊
        });
        res.json(cartItems);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: 'Error fetching cart' });
    }
};

// 檢查購物車中的商品庫存
exports.checkCart = async (req, res) => {
    const { itemId, quantity } = req.body;

    try {
        const item = await Item.findByPk(itemId); // 查詢商品
        if (item && item.stock >= quantity) {
            res.json({ available: true });
        } else {
            res.json({ available: false });
        }
    } catch (error) {
        console.error("Error checking item availability:", error);
        res.status(500).json({ message: 'Error checking item availability' });
    }
};

// 購買下訂單
exports.purchase = async (req, res) => {
    const userId = req.user.id; // 取得使用者 ID

    try {
        // 獲取購物車中的所有商品
        const cartItems = await Cart.findAll({ where: { user_id: userId } });

        // 檢查庫存
        for (let item of cartItems) {
            const product = await Item.findByPk(item.item_id);
            if (!product || product.stock < item.quantity) {
                return res.status(400).json({ message: `Item ${product ? product.name : ''} is out of stock` });
            }
        }

        // 更新庫存和清空購物車
        for (let item of cartItems) {
            const product = await Item.findByPk(item.item_id);
            await product.update({ stock: product.stock - item.quantity });
        }

        // 刪除購物車的項目
        await Cart.destroy({ where: { user_id: userId } });
        res.json({ message: 'Purchase completed' });
    } catch (error) {
        console.error("Error processing purchase:", error);
        res.status(500).json({ message: 'Error processing purchase' });
    }
};
解釋