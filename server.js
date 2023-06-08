const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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
const commentsRouter = require('./routes/comments');
const postsRouter = require('./routes/posts');
const feedbackRouter = require('./routes/feedback');
const authRouter = require('./routes/auth');

app.use('/api/users', usersRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/auth', authRouter);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
