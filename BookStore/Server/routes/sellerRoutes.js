const express = require('express');
const router = express.Router();
const {
  loginSeller,
  signupSeller,
  addBook,
  getMyProducts,
  editBook,
  deleteBook,
  getSellerOrders,
  updateOrderStatus,
} = require('../controllers/SellerControllers');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

// Public auth routes
router.post('/login', loginSeller);
router.post('/signup', signupSeller);

// Protected seller routes
router.post('/books', protect(['seller']), upload.single('coverImage'), addBook);
router.get('/books', protect(['seller']), getMyProducts);
router.put('/books/:id', protect(['seller']), upload.single('coverImage'), editBook);
router.delete('/books/:id', protect(['seller']), deleteBook);
router.get('/orders', protect(['seller']), getSellerOrders);
router.put('/orders/:id/status', protect(['seller']), updateOrderStatus);

module.exports = router;
