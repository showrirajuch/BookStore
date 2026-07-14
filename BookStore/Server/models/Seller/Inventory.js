const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true, unique: true },
    quantity: { type: Number, required: true, default: 0 },
    location: { type: String, default: 'Main Warehouse' },
    condition: { type: String, enum: ['New', 'Like New', 'Used', 'Damaged'], default: 'New' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inventory', inventorySchema);
