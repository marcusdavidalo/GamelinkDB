const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// general routes
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

router.put(
  "/:id/uploadAvatar",
  upload.single("avatar"),
  UserController.uploadAvatar
);
router.put("/:id/removeAvatar", UserController.removeAvatar);

// For adding and removing followers and following
router.post("/addFollower", UserController.addFollower);
router.post("/removeFollower", UserController.removeFollower);
router.post("/addFollowing", UserController.addFollowing);
router.post("/removeFollowing", UserController.removeFollowing);

// For adding and removing games from the wishlist
router.post("/:id/addGameToWishlist", UserController.addGameToWishlist);
router.post("/:id/removeGameFromWishlist", UserController.removeGameFromWishlist);

module.exports = router;
