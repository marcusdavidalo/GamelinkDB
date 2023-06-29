const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateSecret = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

const JWT_SECRET = generateSecret(64);

const AuthController = {
  register: async (req, res) => {
    const { username, email, password, birthdate } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const newUser = new User({
        username,
        email,
        password,
        birthdate,
      });

      // Save the new user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  login: async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: '6h',
      });

      if (rememberMe) {
        const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, {
          expiresIn: '7d',
        });
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