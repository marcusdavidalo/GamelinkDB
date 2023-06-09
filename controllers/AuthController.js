// auth.controller.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Create a new user
      const newUser = new User({
        username,
        email,
        password,
      });

      // Save the user to the database
      await newUser.save();

      // Generate an access token
      const accessToken = generateAccessToken(newUser);

      res
        .status(201)
        .json({ message: 'User registered successfully', accessToken });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  login: async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });

      // Check if user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Generate an access token
      const accessToken = generateAccessToken(user);

      // Generate a refresh token if "Remember me" is selected
      const refreshToken = rememberMe ? generateRefreshToken(user) : null;

      res.json({ message: 'Login successful', accessToken, refreshToken });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },
};

// Helper function to generate an access token
function generateAccessToken(user) {
  const payload = {
    userId: user._id,
    username: user.username,
    // Include any additional user data you need in the token payload
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return accessToken;
}

// Helper function to generate a refresh token
function generateRefreshToken(user) {
  const payload = {
    userId: user._id,
    // Include any additional user data you need in the token payload
  };

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
  // Store the refresh token securely on the server or in a secure HTTP-only cookie

  return refreshToken;
}

module.exports = AuthController;
