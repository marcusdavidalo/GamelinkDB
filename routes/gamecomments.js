const express = require('express');
const router = express.Router();
const GameCommentController = require('../controllers/GameCommentController');

// Define routes
router.get('/', GameCommentController.getAllComments);
router.get('/:id', GameCommentController.getCommentById);
router.post('/', GameCommentController.createComment);
router.put('/:id', GameCommentController.updateComment);
router.delete('/:id', GameCommentController.deleteComment);

module.exports = router;
