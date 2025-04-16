const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Contact = require('../models/Contact');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// POST /api/contact
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { name, mobile, email, message } = req.body;
    const filePath = req.file ? req.file.filename : null;

    console.log('Form Data:', req.body);
    console.log('File Info:', req.file);

    const newContact = new Contact({
      name,
      mobile,
      email,
      filePath,
      message,
    });

    await newContact.save();

    res.json({ success: true, message: 'Message received successfully.' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
