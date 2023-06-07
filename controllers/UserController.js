const User = require('../models/User');

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  createUser: async (req, res) => {
    const {
      username,
      email,
      password,
      socialLoginProvider,
      socialLoginId,
      name,
      avatar,
      bio,
    } = req.body;
    try {
      const newUser = new User({
        username,
        email,
        password,
        socialLoginProvider,
        socialLoginId,
        name,
        avatar,
        bio,
      });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const {
      username,
      email,
      password,
      socialLoginProvider,
      socialLoginId,
      name,
      avatar,
      bio,
    } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        id,
        {
          username,
          email,
          password,
          socialLoginProvider,
          socialLoginId,
          name,
          avatar,
          bio,
        },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ error: 'You are not authorized to delete others accounts' });
    }
  },
};

module.exports = UserController;
