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
    const videoFile = req.files['video'] ? req.files['video'][0] : null;
    const photoFile = req.files['photo'] ? req.files['photo'][0] : null;

    try {
      // Compress the video before uploading to Cloudinary
      const compressedVideo = await cloudinary.uploader.upload(videoFile.path, {
        resource_type: 'video',
        quality: 'auto',
        eager: [{ quality: 'auto', format: 'mp4' }],
      });

      // Compress the photo before uploading to Cloudinary
      const compressedPhoto = await cloudinary.uploader.upload(photoFile.path, {
        resource_type: 'image',
        quality: 'auto',
        fetch_format: 'auto',
        eager: [{ quality: 'auto', fetch_format: 'auto' }],
      });

      const newPost = new Post({
        userId,
        content,
        videoUrl: compressedVideo.secure_url,
        photoUrl: compressedPhoto.secure_url,
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
