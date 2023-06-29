const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

// Define routes
router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);
router.post(
  '/',
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'photo', maxCount: 5 },
  ]),
  PostController.createPost
);
router.post('/like', PostController.likePost);
router.post('/unlike', PostController.unlikePost);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

module.exports = router;
