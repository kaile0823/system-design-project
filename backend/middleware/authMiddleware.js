// backend/middleware/authMiddleware.js

export const authenticate = (req, res, next) => {
    // 模擬用戶已驗證，直接附加用戶數據到請求對象
    req.user = { id: 1, username: 'testuser', email: 'testuser@example.com' }; 
    next(); // 繼續處理請求
};