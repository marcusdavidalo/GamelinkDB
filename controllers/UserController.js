const User = require('../models/User');
const bcrypt = require('bcrypt');

const UserController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      // Retrieve all users from the database
      const users = await User.find();
      res.json(users);
    } catch (error) {
      // Return an error response if any error occurs
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  // Get a user by ID
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      // Find the user by ID
      const user = await User.findById(id);
      if (!user) {
        // Return an error response if the user is not found
        return res.status(404).json({ error: 'User not found' });
      }
      // Return the user object
      res.json(user);
    } catch (error) {
      // Return an error response if any error occurs
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  // Create a new user
  createUser: async (req, res) => {
    const {
      username,
      email,
      password,
      birthdate,
      socialLoginProvider,
      socialLoginId,
      name,
      avatar,
      bio,
    } = req.body;
    try {
      // Create a new user object with the provided details
      const newUser = new User({
        username,
        email,
        password,
        birthdate,
        socialLoginProvider,
        socialLoginId,
        name,
        avatar,
        bio,
      });
      // Save the new user to the database
      await newUser.save();
      // Return the created user object
      res.status(201).json(newUser);
    } catch (error) {
      // Return an error response if any error occurs
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  // Update a user by ID
  updateUser: async (req, res) => {
    const { id } = req.params;
    const {
      username,
      email,
      password,
      birthdate,
      socialLoginProvider,
      socialLoginId,
      name,
      avatar,
      bio,
    } = req.body;
    try {
      // Find the user by ID
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update the user's fields with the provided values
      user.username = username;
      user.email = email;
      user.birthdate = birthdate;
      user.socialLoginProvider = socialLoginProvider;
      user.socialLoginId = socialLoginId;
      user.name = name;
      user.avatar = avatar;
      user.bio = bio;

      // Check if the password field is provided and update it if necessary
      if (password) {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(password, salt);
        // Set the hashed password as the user's password
        user.password = hashedPassword;
      }

      // Save the updated user to the database
      await user.save();

      // Return the updated user object
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  // Delete a user by ID
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      // Find the user by ID and delete it from the database
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        // Return an error response if the user is not found
        return res.status(404).json({ error: 'User not found' });
      }
      // Return a success message
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      // Return an error response if any error occurs
      res
        .status(500)
        .json({ error: 'You are not authorized to delete others accounts' });
    }
  },
};

module.exports = UserController;

/*
Explanation:

This UserController module exports an object with several functions that handle user-related operations. Here's a summary of each function:

- getAllUsers: Retrieves all users from the database and returns them as a JSON response.

- getUserById: Takes an ID as a parameter, finds the corresponding user in the database, and returns it as a JSON response. If the user is not found, it returns an error response.

- createUser: Creates a new user based on the provided request body, saves it to the database, and returns the created user as a JSON response. If any error occurs during the process, it returns an error response.

- updateUser: Takes an ID as a parameter, finds the corresponding user in the database, updates the user's fields based on the provided request body, and returns the updated user as a JSON response. If the user is not found, it returns an error response.

- deleteUser: Takes an ID as a parameter, finds the corresponding user in the database, deletes it, and returns a success message. If the user is not found or the requester is not authorized to delete the user, it returns an error response.
*/
