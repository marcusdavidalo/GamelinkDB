const Post = require('../models/Post');
const cloudinary = require('../config/cloudinary');

const PostController = {
  getAllPosts: async (req, res) => {
    try {
      // Check for the userId query parameter
      const userId = req.query.userId;

      // If the userId query parameter is present, only return posts from that user
      const posts = userId ? await Post.find({ userId }) : await Post.find();

      res.json(posts);
    } catch (error) {
      console.error('Error in getAllPosts:', error);
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
      let videoUrl = null;
      let photoUrl = null;

      // Compress the video before uploading to Cloudinary
      if (videoFile) {
        const compressedVideo = await cloudinary.uploader.upload(
          videoFile.path,
          {
            resource_type: 'video',
            quality: 'auto',
            eager: [{ quality: 'auto', format: 'mp4' }],
          }
        );
        videoUrl = compressedVideo.secure_url;
      }

      // Compress the photo before uploading to Cloudinary
      if (photoFile) {
        const compressedPhoto = await cloudinary.uploader.upload(
          photoFile.path,
          {
            resource_type: 'image',
            quality: 'auto',
            fetch_format: 'auto',
            eager: [{ quality: 'auto', fetch_format: 'auto' }],
          }
        );
        photoUrl = compressedPhoto.secure_url;
      }

      const newPost = new Post({
        userId,
        content,
        videoUrl,
        photoUrl,
      });

      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error in createPost:', error);
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
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Delete photo and video from Cloudinary
      if (post.photoUrl) {
        const photoPublicId = post.photoUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(photoPublicId);
      }
      if (post.videoUrl) {
        const videoPublicId = post.videoUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(videoPublicId, {
          resource_type: 'video',
        });
      }

      await post.remove();
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },
};

module.exports = PostController;
