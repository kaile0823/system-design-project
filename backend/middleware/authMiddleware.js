// backend/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // 取得 Authorization 標頭中的 JWT
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        // 驗證並解碼 JWT
        const decoded = jwt.verify(token, 'your_secret_key'); // 替換 'your_secret_key' 為你的密鑰
        req.user = decoded; // 將解碼後的使用者資料附加到請求中
        next(); // 呼叫下一個處理函數
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // To be develope
    // const { username, password } = req.body;

    // // Validate credentials
    // const user = await User.findOne({ where: { username } });
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //     return res.status(401).json({ error: 'Invalid credentials' });
    // }

    // // Generate token (e.g., JWT)
    // const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
    // res.json({ token });
    

    // // Use token for protected routes
    // axios.get('/api/protected', {
    //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    // });
};