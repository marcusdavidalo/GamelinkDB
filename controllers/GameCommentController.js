const GameComment = require("../models/GameComment");

const GameCommentController = {
  getAllComments: async (req, res) => {
    try {
      const comments = await GameComment.find();
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  getCommentById: async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await GameComment.findById(id);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.json(comment);
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },

  createComment: async (req, res) => {
    const { userId, gameId, content } = req.body;

    try {
      const newComment = new GameComment({
        userId,
        gameId,
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
    const { userId, gameId, content } = req.body;
    try {
      const comment = await GameComment.findByIdAndUpdate(
        id,
        { userId, gameId, content },
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
      const comment = await GameComment.findByIdAndDelete(id);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  },
};

module.exports = GameCommentController;
