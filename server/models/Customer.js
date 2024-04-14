const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  status: { type: String, default: 'Active' },  // e.g., Active, Inactive, Prospective
});

module.exports = mongoose.model('Customer', customerSchema);
