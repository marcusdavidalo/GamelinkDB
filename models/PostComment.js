const mongoose = require('mongoose');

const postCommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  postId: mongoose.Schema.Types.ObjectId,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const PostComment = mongoose.model('PostComment', postCommentSchema);

module.exports = PostComment;
