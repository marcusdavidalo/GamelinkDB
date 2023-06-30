const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

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
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

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
      const user = await User.findByIdAndUpdate(
        id,
        {
          username,
          email,
          password,
          birthdate,
          socialLoginProvider,
          socialLoginId,
          name,
          avatar,
          bio,
        },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "You are not authorized to delete others accounts" });
    }
  },

  addFollower: async (req, res) => {
    const { userId, followerId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.followers.push(followerId);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  removeFollower: async (req, res) => {
    const { userId, followerId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.followers.pull(followerId);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  addFollowing: async (req, res) => {
    const { userId, followingameId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.following.push(followingameId);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  removeFollowing: async (req, res) => {
    const { userId, followingameId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.following.pull(followingameId);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  uploadAvatar: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result);

      // Update the avatar URL in the user document
      user.avatar = result.secure_url;
      await user.save();

      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred" });
    }
  },

  removeAvatar: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Remove the avatar URL from Cloudinary
      if (user.avatar) {
        const publicId = user.avatar.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      // Clear the avatar field in the user document
      user.avatar = "";
      await user.save();

      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred" });
    }
  },
};

module.exports = UserController;
