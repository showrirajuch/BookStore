const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authors: [{ type: String, required: true }], // Many-to-Many author relationship
    genres: [{ type: String, required: true }], // Many-to-Many genre relationship
    description: { type: String },
    price: { type: Number, required: true },
    coverImage: { type: String }, // Path to uploaded book cover image
    availability: { type: Boolean, default: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
