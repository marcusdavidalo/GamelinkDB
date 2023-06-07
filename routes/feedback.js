const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers/FeedbackController');

// Define routes
router.get('/', FeedbackController.getAllFeedback);
router.get('/:id', FeedbackController.getFeedbackById);
router.post('/', FeedbackController.createFeedback);
router.put('/:id', FeedbackController.updateFeedback);
router.delete('/:id', FeedbackController.deleteFeedback);

module.exports = router;
