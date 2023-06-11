const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate a random secret
const generateSecret = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

const JWT_SECRET = generateSecret(64); // Generate a 64-byte secret

const AuthController = {
  register: async (req, res) => {
    const { username, email, password, birthdate } = req.body;

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
        birthdate,
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    console.log('Request body:', req.body);

    try {
      // Find the user by email
      const user = await User.findOne({ email });

      console.log('User:', user);

      // Check if user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Is password valid:', isPasswordValid);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Create a token
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: '1h',
      });
      console.log('Token:', token);

      if (rememberMe) {
        // Add this block
        // Generate a refresh token
        const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, {
          expiresIn: '7d',
        });

        // Send the refresh token to the client
        res.json({
          message: 'Login successful',
          token,
          refreshToken,
          username: user.username,
        });
      } else {
        res.json({
          message: 'Login successful',
          token,
          username: user.username,
        });
      }
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
};

module.exports = AuthController;
