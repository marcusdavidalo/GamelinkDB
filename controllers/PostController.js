const Post = require('../models/Post');

const PostController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  getPostById: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  createPost: async (req, res) => {
    const { userId, content } = req.body;
    try {
      const newPost = new Post({
        userId,
        content,
      });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  updatePost: async (req, res) => {
    const { id } = req.params;
    const { userId, content } = req.body;
    try {
      const post = await Post.findByIdAndUpdate(
        id,
        { userId, content },
        { new: true }
      );
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  deletePost: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findByIdAndDelete(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },
};

module.exports = PostController;
