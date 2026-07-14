const User = require('../models/Users/User');
const Book = require('../models/Seller/Book');
const Inventory = require('../models/Seller/Inventory');
const Order = require('../models/Users/Order');
const Interaction = require('../models/Users/Interaction');
const Review = require('../models/Users/Review');
const jwt = require('jsonwebtoken');

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1d' });
      res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: 'user' } });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User Sign Up
const signupUser = async (req, res) => {
  const { name, email, password, preferences } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    
    const user = await User.create({ name, email, password, preferences });
    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: 'user' } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all books with options to filter
const getBooks = async (req, res) => {
  const { search, genre, author } = req.query;
  let query = {};
  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }
  if (genre) {
    query.genres = { $in: [genre] };
  }
  if (author) {
    query.authors = { $in: [author] };
  }
  try {
    const books = await Book.find(query);
    const booksWithDetails = await Promise.all(
      books.map(async (book) => {
        const inventory = await Inventory.findOne({ book: book._id });
        const reviews = await Review.find({ book: book._id });
        const avgRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) : 0;
        return {
          ...book.toObject(),
          stock: inventory ? inventory.quantity : 0,
          avgRating,
          reviewsCount: reviews.length,
        };
      })
    );
    res.json(booksWithDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single book details
const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).populate('seller', 'businessName');
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const inventory = await Inventory.findOne({ book: id });
    const reviews = await Review.find({ book: id }).populate('user', 'name');
    const avgRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) : 0;

    let userInteraction = null;
    if (req.user) {
      userInteraction = await Interaction.findOne({ user: req.user.id, book: id });
    }

    res.json({
      book,
      stock: inventory ? inventory.quantity : 0,
      condition: inventory ? inventory.condition : 'New',
      reviews,
      avgRating,
      userInteraction,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Purchase / Checkout
const placeOrder = async (req, res) => {
  const { items, shippingAddress } = req.body;
  try {
    let totalAmount = 0;
    const orderItems = [];

    for (let item of items) {
      const book = await Book.findById(item.bookId);
      if (!book) return res.status(404).json({ message: `Book with ID ${item.bookId} not found` });

      const inventory = await Inventory.findOne({ book: item.bookId });
      if (!inventory || inventory.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for book: ${book.title}` });
      }

      inventory.quantity -= item.quantity;
      await inventory.save();

      totalAmount += book.price * item.quantity;
      orderItems.push({
        book: book._id,
        quantity: item.quantity,
        price: book.price,
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentStatus: 'Paid',
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get personal orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.book');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Manage reading progress and score (User-Book interaction)
const updateInteraction = async (req, res) => {
  const { bookId } = req.params;
  const { readingProgress, rating } = req.body;
  try {
    const updateFields = { lastReadAt: Date.now() };
    if (readingProgress !== undefined) updateFields.readingProgress = readingProgress;
    if (rating !== undefined) updateFields.rating = rating;

    const interaction = await Interaction.findOneAndUpdate(
      { user: req.user.id, book: bookId },
      updateFields,
      { new: true, upsert: true }
    );
    res.json(interaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Write a Book Review
const addReview = async (req, res) => {
  const { bookId } = req.params;
  const { rating, comment } = req.body;
  try {
    const review = await Review.create({
      user: req.user.id,
      book: bookId,
      rating,
      comment,
    });

    await Interaction.findOneAndUpdate(
      { user: req.user.id, book: bookId },
      { rating },
      { upsert: true }
    );

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getBooks,
  getBookById,
  placeOrder,
  getMyOrders,
  updateInteraction,
  addReview,
};
