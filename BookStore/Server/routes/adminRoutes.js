const express = require('express');
const router = express.Router();
const {
  loginAdmin,
  signupAdmin,
  getSystemStats,
  getSellers,
  approveSeller,
  blockSeller,
  getUsers,
} = require('../controllers/AdminControllers');
const { protect } = require('../middlewares/authMiddleware');

// Public auth routes
router.post('/login', loginAdmin);
router.post('/signup', signupAdmin);

// Protected admin routes
router.get('/stats', protect(['admin']), getSystemStats);
router.get('/sellers', protect(['admin']), getSellers);
router.put('/sellers/:id/approve', protect(['admin']), approveSeller);
router.put('/sellers/:id/block', protect(['admin']), blockSeller);
router.get('/users', protect(['admin']), getUsers);

module.exports = router;
