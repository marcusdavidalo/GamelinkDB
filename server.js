const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(process.env.MONGO_URI, connectionParams)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// API Key Middleware
const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers.apiKey || req.query.apiKey;
  if (apiKey === process.env.API_KEY) {
    next(); // Proceed to the next middleware/route handler
  } else {
    res.status(401).json({ message: 'Invalid API key' });
  }
};

// Apply API Key Middleware to all routes
app.use(apiKeyMiddleware);

// Routes
const usersRouter = require('./routes/users');
const gameCommentsRouter = require('./routes/gamecomments');
const postCommentsRouter = require('./routes/postcomments');
const postsRouter = require('./routes/posts');
const feedbackRouter = require('./routes/feedback');
const authRouter = require('./routes/auth');

app.use('/api/users', usersRouter);
app.use('/api/gamecomments', gameCommentsRouter);
app.use('/api/postcomments', postCommentsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/auth', authRouter);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
