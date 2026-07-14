const Seller = require('../models/Seller/Seller');
const Book = require('../models/Seller/Book');
const Inventory = require('../models/Seller/Inventory');
const Order = require('../models/Users/Order');
const jwt = require('jsonwebtoken');

// Seller Login
const loginSeller = async (req, res) => {
  const { email, password } = req.body;
  try {
    const seller = await Seller.findOne({ email });
    if (seller && seller.password === password) {
      if (!seller.isApproved) {
        return res.status(403).json({ message: 'Seller access pending approval by administrator' });
      }
      const token = jwt.sign({ id: seller._id, role: 'seller' }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1d' });
      res.json({ token, seller: { id: seller._id, businessName: seller.businessName, email: seller.email, role: 'seller' } });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Seller Sign Up
const signupSeller = async (req, res) => {
  const { businessName, ownerName, email, password, phone, address } = req.body;
  try {
    const exists = await Seller.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Seller email is already registered' });
    
    const seller = await Seller.create({ businessName, ownerName, email, password, phone, address });
    res.status(201).json({ message: 'Registered successfully. Awaiting administrator approval.', seller });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Book to Catalog
const addBook = async (req, res) => {
  const { title, authors, genres, description, price, quantity, location, condition } = req.body;
  const coverImage = req.file ? req.file.path : '';
  try {
    const book = await Book.create({
      title,
      authors: Array.isArray(authors) ? authors : String(authors).split(',').map(s => s.trim()),
      genres: Array.isArray(genres) ? genres : String(genres).split(',').map(s => s.trim()),
      description,
      price: Number(price),
      coverImage,
      seller: req.user.id
    });

    // Create 1:1 Book inventory tracking entry
    await Inventory.create({
      book: book._id,
      quantity: Number(quantity) || 0,
      location: location || 'Main Warehouse',
      condition: condition || 'New'
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Seller products
const getMyProducts = async (req, res) => {
  try {
    const books = await Book.find({ seller: req.user.id });
    const booksWithInventory = await Promise.all(
      books.map(async (book) => {
        const inventory = await Inventory.findOne({ book: book._id });
        return { ...book.toObject(), inventory };
      })
    );
    res.json(booksWithInventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Book & Inventory Info
const editBook = async (req, res) => {
  const { id } = req.params;
  const { title, authors, genres, description, price, quantity, location, condition } = req.body;
  try {
    const book = await Book.findOne({ _id: id, seller: req.user.id });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (title) book.title = title;
    if (authors) book.authors = Array.isArray(authors) ? authors : String(authors).split(',').map(s => s.trim());
    if (genres) book.genres = Array.isArray(genres) ? genres : String(genres).split(',').map(s => s.trim());
    if (description) book.description = description;
    if (price !== undefined) book.price = Number(price);
    if (req.file) book.coverImage = req.file.path;
    
    await book.save();

    const updateFields = {};
    if (quantity !== undefined) updateFields.quantity = Number(quantity);
    if (location) updateFields.location = location;
    if (condition) updateFields.condition = condition;

    if (Object.keys(updateFields).length > 0) {
      await Inventory.findOneAndUpdate({ book: id }, updateFields, { new: true });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Book from catalog
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findOneAndDelete({ _id: id, seller: req.user.id });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    await Inventory.findOneAndDelete({ book: id });
    res.json({ message: 'Book and its inventory deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch orders received for the seller's products
const getSellerOrders = async (req, res) => {
  try {
    const sellerBooks = await Book.find({ seller: req.user.id });
    const sellerBookIds = sellerBooks.map(b => b._id.toString());

    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.book');

    const filteredOrders = orders.map(order => {
      const orderObj = order.toObject();
      orderObj.items = orderObj.items.filter(item => item.book && sellerBookIds.includes(item.book._id.toString()));
      return orderObj;
    }).filter(order => order.items.length > 0);

    res.json(filteredOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order progress status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginSeller,
  signupSeller,
  addBook,
  getMyProducts,
  editBook,
  deleteBook,
  getSellerOrders,
  updateOrderStatus,
};
