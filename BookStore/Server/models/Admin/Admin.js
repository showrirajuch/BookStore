const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
    permissions: {
      manageUsers: { type: Boolean, default: true },
      manageSellers: { type: Boolean, default: true },
      manageBooks: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
