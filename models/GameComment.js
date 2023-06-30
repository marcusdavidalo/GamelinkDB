const mongoose = require("mongoose");

const gameCommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  gameId: Number,
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

const GameComment = mongoose.model("GameComment", gameCommentSchema);

module.exports = GameComment;
