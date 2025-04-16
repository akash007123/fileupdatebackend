const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  filePath: String,
  message: String,
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
