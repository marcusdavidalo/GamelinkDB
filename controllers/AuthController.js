const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate a random secret
const generateSecret = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

// Generate a 64-byte secret
const JWT_SECRET = generateSecret(64);

const AuthController = {
  // Handles user registration
  register: async (req, res) => {
    // Extract user details from the request body
    const { username, email, password, birthdate } = req.body;

    try {
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // Return an error response if the email already exists
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Create a new user object with the provided details
      const newUser = new User({
        username,
        email,
        password,
        birthdate,
      });

      // Save the new user to the database
      await newUser.save();

      // Return a success response
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      // Return an error response if any error occurs
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  // Handles user login
  login: async (req, res) => {
    // Extract login details from the request body
    const { email, password, rememberMe } = req.body;

    console.log('Request body:', req.body);

    try {
      // Find the user by email
      const user = await User.findOne({ email });

      console.log('User:', user);

      // Check if user exists
      if (!user) {
        // Return an error response if the user is not found
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare the provided password with the stored password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Is password valid:', isPasswordValid);

      if (!isPasswordValid) {
        // Return an error response if the password is invalid
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Create a token for authentication using JWT
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: '1h',
      });
      console.log('Token:', token);

      if (rememberMe) {
        // Generate a refresh token with a longer expiration
        const refreshToken = jwt.sign({ id: user._id }, JWT_SECRET, {
          expiresIn: '7d',
        });

        // Send the refresh token to the client along with the success response
        res.json({
          message: 'Login successful',
          token,
          refreshToken,
          username: user.username,
        });
      } else {
        // Send the success response with the token and username
        res.json({
          message: 'Login successful',
          token,
          username: user.username,
        });
      }
    } catch (error) {
      console.log('Error:', error);
      // Return an error response if any error occurs
      res.status(500).json({ error: 'An error occurred' });
    }
  },
};

module.exports = AuthController;

/*
Explanation:

- The code above defines the AuthController, which handles user registration and login.

- The AuthController requires the User model, bcrypt, jwt, and crypto modules.

- A helper function, generateSecret, is defined to generate a random secret using crypto.randomBytes.

- A 64-byte secret, JWT_SECRET, is generated using the generateSecret function.

- The AuthController object is created with two methods: register and login.

- The register method handles user registration. It extracts the username, email, password, and birthdate from the request body. It then checks if the email is already registered in the database. If the email is already registered, it returns an error response. Otherwise, it creates a new User object with the provided details, saves it to the database, and returns a success response.

- The login method handles user login. It extracts the email, password, and rememberMe flag from the request body. It finds the user by email in the database. If the user is not found, it returns an error response. If the user is found, it compares the provided password with the stored password using bcrypt. If the password is invalid, it returns an error response. If the password is valid, it creates a token for authentication using JWT. If rememberMe is true, it also generates a refresh token with a longer expiration. It then sends a success response with the token and username (and refresh token if rememberMe is true).

- The AuthController object is exported to be used by other parts of the application.
*/
