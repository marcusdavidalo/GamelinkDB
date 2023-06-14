const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Define routes

// Route: GET /
// Description: Get all users
router.get('/', UserController.getAllUsers);

// Route: GET /:id
// Description: Get user by ID
router.get('/:id', UserController.getUserById);

// Route: POST /
// Description: Create a new user
router.post('/', UserController.createUser);

// Route: PUT /:id
// Description: Update a user by ID
router.put('/:id', UserController.updateUser);

// Route: DELETE /:id
// Description: Delete a user by ID
router.delete('/:id', UserController.deleteUser);

module.exports = router;

/*
Explanation:

- The code above defines the routes for handling user-related operations.
- The express.Router() function creates a new router object.
- The UserController module is imported to access the controller methods for user operations.

- GET /: This route is used to get all users. It is associated with the UserController.getAllUsers method.

- GET /:id: This route is used to get a specific user by their ID. It is associated with the UserController.getUserById method.

- POST /: This route is used to create a new user. It is associated with the UserController.createUser method.

- PUT /:id: This route is used to update a specific user by their ID. It is associated with the UserController.updateUser method.

- DELETE /:id: This route is used to delete a specific user by their ID. It is associated with the UserController.deleteUser method.

- The router object is exported to be used by other parts of the application.
*/
