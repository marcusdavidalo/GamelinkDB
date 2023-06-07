const Feedback = require('../models/Feedback');

const FeedbackController = {
  getAllFeedback: async (req, res) => {
    try {
      const feedbacks = await Feedback.find();
      res.json(feedbacks);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  getFeedbackById: async (req, res) => {
    const { id } = req.params;
    try {
      const feedback = await Feedback.findById(id);
      if (!feedback) {
        return res.status(404).json({ error: 'Feedback not found' });
      }
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  createFeedback: async (req, res) => {
    const { userId, content } = req.body;
    try {
      const newFeedback = new Feedback({
        userId,
        content,
      });
      await newFeedback.save();
      res.status(201).json(newFeedback);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  updateFeedback: async (req, res) => {
    const { id } = req.params;
    const { userId, content } = req.body;
    try {
      const feedback = await Feedback.findByIdAndUpdate(
        id,
        { userId, content },
        { new: true }
      );
      if (!feedback) {
        return res.status(404).json({ error: 'Feedback not found' });
      }
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  deleteFeedback: async (req, res) => {
    const { id } = req.params;
    try {
      const feedback = await Feedback.findByIdAndDelete(id);
      if (!feedback) {
        return res.status(404).json({ error: 'Feedback not found' });
      }
      res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  },
};

module.exports = FeedbackController;
