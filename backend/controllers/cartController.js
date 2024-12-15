import ProductSqliteModel from '../models/productSqliteModel.js'; // 引入 ProductSqliteModel 模型
import CartSqliteModel from '../models/cartSqliteModel.js'; // 引入 Cart 模型



export const addCartController = async (req, res) => {
    try {
      const { user_id, email, productID, productCount } = req.body; // 解構前端送來的資料
  
      const product = await ProductSqliteModel.findByPk(productID);
      if (!product || product.quantity < productCount) {
          return res.status(400).json({ message: `Item ${product ? product.name : ''} is out of stock` });
      }
      
  
      // 插入資料到 carts 表
      const newCartItem = await CartSqliteModel.create({
        user_id,
        item_id: productID,
        quantity: productCount
      });
  
      // 返回成功響應
      return res.status(201).json({
        message: 'Item added to cart successfully',
        cartItem: newCartItem
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

    // 獲取使用者的購物車資料
    export const getCartController = async (req, res) => {

        try {
            const { userId } = req.body; // 解構前端送來的資料





            const cartItems = await CartSqliteModel.findAll({
                where: { user_id: userId },
                include: [{ 
                 model: ProductSqliteModel, 
                 as: 'Product',
                attributes: ['name', 'price', 'description'] 
                 }],
                  raw: true, // 獲取原始查詢結果，展開嵌套結構
                  nest: true // 適用於包含關聯時，展開時結構更清晰
              });
              
            
              const formattedItems = cartItems.map(item => ({
                id: item.id,
                user_id: item.user_id,
                item_id: item.item_id,
                quantity: item.quantity,
                name: item.Product.name,
                price: item.Product.price,
                description: item.Product.description,
            }));







            console.error(formattedItems);
            res.json(formattedItems);
        } catch (error) {
            console.error("Error fetching cart:", error);
            res.status(500).json({ message: 'Error fetching cart' });
        }
    }

    // 檢查購物車中的商品庫存
    export const checkCartController = async (req, res) => {
        const { itemId, quantity } = req.body;

        try {
            const product = await ProductSqlite.findByPk(itemId); // 查詢商品
            if (product && product.quantity >= quantity) {
                res.json({ available: true });
            } else {
                res.json({ available: false });
            }
        } catch (error) {
            console.error("Error checking item availability:", error);
            res.status(500).json({ message: 'Error checking item availability' });
        }
    }

    // 購買下訂單
    export const purchaseController = async (req, res) => {
        const userId = req.user.id; // 取得使用者 ID

        try {
            const cartItems = await Cart.findAll({ where: { user_id: userId } });

            // 檢查庫存
            for (let item of cartItems) {
                const product = await ProductSqlite.findByPk(item.item_id);
                if (!product || product.quantity < item.quantity) {
                    return res.status(400).json({ message: `Item ${product ? product.name : ''} is out of stock` });
                }
            }

            // 更新庫存和清空購物車
            for (let item of cartItems) {
                const product = await ProductSqlite.findByPk(item.item_id);
                await product.update({ quantity: product.quantity - item.quantity });
            }

            await Cart.destroy({ where: { user_id: userId } });
            res.json({ message: 'Purchase completed' });
        } catch (error) {
            console.error("Error processing purchase:", error);
            res.status(500).json({ message: 'Error processing purchase' });
        }
    }
    export const removeItemFromCart = async (req, res) => {
        try {
          const { userId,itemId } = req.body;
          
          console.error("trigger");
          // 嘗試刪除資料庫中所有 item_id 匹配的記錄
          const deleteCount = await CartSqliteModel.destroy({
            where: { 
              user_id: userId, // 用戶 ID
              item_id: itemId      // 商品 ID
            }
          });
      
          // 判斷是否刪除成功
          if (deleteCount === 0) {
            console.error("failed deleting item");
            return res.status(404).json({ message: 'No items found with the given item_id' });
          }
          console.error("success deleting item");
          // 刪除成功
          return res.status(200).json({ message: `${deleteCount} item(s) removed successfully` });
        } catch (error) {
          console.error('Error removing items from cart:', error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      };
