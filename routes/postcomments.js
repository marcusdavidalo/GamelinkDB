const express = require('express');
const router = express.Router();
const PostCommentController = require('../controllers/PostCommentController');

// Define routes
router.get('/', PostCommentController.getAllComments);
router.get('/:id', PostCommentController.getCommentById);
router.post('/', PostCommentController.createComment);
router.put('/:id', PostCommentController.updateComment);
router.delete('/:id', PostCommentController.deleteComment);

module.exports = router;
