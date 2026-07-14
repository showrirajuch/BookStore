const Admin = require('../models/Admin/Admin');
const Seller = require('../models/Seller/Seller');
const User = require('../models/Users/User');
const Book = require('../models/Seller/Book');
const Order = require('../models/Users/Order');
const jwt = require('jsonwebtoken');

// Admin Login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (admin && admin.password === password) {
      const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1d' });
      res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email, role: 'admin' } });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin Register
const signupAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Admin already exists' });
    const admin = await Admin.create({ name, email, password });
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1d' });
    res.status(201).json({ token, admin: { id: admin._id, name: admin.name, email: admin.email, role: 'admin' } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Dashboard Stats
const getSystemStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const sellersCount = await Seller.countDocuments();
    const booksCount = await Book.countDocuments();
    const ordersCount = await Order.countDocuments();
    const orders = await Order.find({ paymentStatus: 'Paid' });
    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    res.json({
      usersCount,
      sellersCount,
      booksCount,
      ordersCount,
      totalSales
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Sellers
const getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().select('-password');
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve Seller
const approveSeller = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true }).select('-password');
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Block Seller
const blockSeller = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.id, { isApproved: false }, { new: true }).select('-password');
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginAdmin,
  signupAdmin,
  getSystemStats,
  getSellers,
  approveSeller,
  blockSeller,
  getUsers,
};
