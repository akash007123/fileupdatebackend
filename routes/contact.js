// routes/contact.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Contact = require('../models/Contact');

// Ensure 'uploads' directory exists
const uploadPath = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
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
    console.error('❌ Error saving contact:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
