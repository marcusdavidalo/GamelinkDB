const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// general routes
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

// For adding and removing followers and following
router.post('/addFollower', UserController.addFollower);
router.post('/removeFollower', UserController.removeFollower);
router.post('/addFollowing', UserController.addFollowing);
router.post('/removeFollowing', UserController.removeFollowing);

module.exports = router;
