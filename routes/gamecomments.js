const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const GameCommentController = require("../controllers/GameCommentController");

// Define routes
router.get("/", GameCommentController.getAllComments); // get all comments
router.get("/:id", GameCommentController.getCommentById); // for getting by id
router.post("/", upload.none(), GameCommentController.createComment); // for creating
router.put("/:id", GameCommentController.updateComment); // for editing
router.delete("/:id", GameCommentController.deleteComment); // for deleting

module.exports = router;
