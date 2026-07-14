const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    readingProgress: { type: Number, default: 0, min: 0, max: 100 }, // Reading percentage
    rating: { type: Number, min: 1, max: 5 }, // Personal rating
    lastReadAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Compound index to guarantee uniqueness of interactions per user-book pair
interactionSchema.index({ user: 1, book: 1 }, { unique: true });

module.exports = mongoose.model('Interaction', interactionSchema);
