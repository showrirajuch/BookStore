const express = require('express');
const router = express.Router();
const {
  loginUser,
  signupUser,
  getBooks,
  getBookById,
  placeOrder,
  getMyOrders,
  updateInteraction,
  addReview,
} = require('../controllers/UsersController');
const { protect } = require('../middlewares/authMiddleware');

// Optional auth decoder middleware (doesn't fail if no authorization header present)
const optionalProtect = (req, res, next) => {
  const jwt = require('jsonwebtoken');
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
      req.user = decoded;
    } catch (error) {
      // Continue without user object if token is expired/invalid
    }
  }
  next();
};

// Public customer routes
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/books', getBooks);
router.get('/books/:id', optionalProtect, getBookById);

// Protected customer routes
router.post('/orders', protect(['user']), placeOrder);
router.get('/orders', protect(['user']), getMyOrders);
router.put('/books/:bookId/interaction', protect(['user']), updateInteraction);
router.post('/books/:bookId/reviews', protect(['user']), addReview);

module.exports = router;
