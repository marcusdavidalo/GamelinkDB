const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define routes
router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);
router.post(
  '/',
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'photo', maxCount: 5 },
  ]),
  PostController.createPost
);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

module.exports = router;
