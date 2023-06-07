const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

// Define routes
router.get('/', CommentController.getAllComments);
router.get('/:id', CommentController.getCommentById);
router.post('/', CommentController.createComment);
router.put('/:id', CommentController.updateComment);
router.delete('/:id', CommentController.deleteComment);

module.exports = router;
