// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  message: String,
  filePath: String
});

module.exports = mongoose.model('Contact', contactSchema);
const savedContact = await newContact.save();
console.log('✅ Saved to DB:', savedContact); 