const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/getitems', itemController.getItems);
router.get('/getitem/:id', itemController.getItem);
router.post('/addcart', authenticate, itemController.addCart);
router.get('/getcart', itemController.getCart);
router.post('/checkcart', itemController.checkCart);
router.post('/purchase', itemController.purchase);

module.exports = router;