const PostComment = require("../models/PostComment");

const PostCommentController = {
  getAllComments: async (req, res) => {
    try {
      const comments = await PostComment.find();
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  getCommentById: async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await PostComment.findById(id);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  createComment: async (req, res) => {
    const { userId, postId, content } = req.body;
    try {
      const newComment = new PostComment({
        userId,
        postId,
        content,
      });
      await newComment.save();
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  updateComment: async (req, res) => {
    const { id } = req.params;
    const { userId, postId, content } = req.body;
    try {
      const comment = await PostComment.findByIdAndUpdate(
        id,
        { userId, postId, content },
        { new: true }
      );
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  deleteComment: async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await PostComment.findByIdAndDelete(id);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  likeComment: async (req, res) => {
    const { userId, gameId, content } = req.body;
    try {
      const comment = await PostComment.findById(gameId);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      comment.likes.push(userId);
      await comment.save();
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  unlikePost: async (req, res) => {
    const { userId, gameId, content } = req.body;
    try {
      const comment = await PostComment.findById(gameId);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      comment.likes.pull(userId);
      await comment.save();
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },
};

module.exports = PostCommentController;
