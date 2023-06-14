const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Register route

// Route: POST /register
// Description: Register a new user
router.post('/register', AuthController.register);

// Login route

// Route: POST /login
// Description: Log in a user
router.post('/login', AuthController.login);

module.exports = router;

/*
Explanation:

- The code above defines the routes for user authentication.

- The express.Router() function creates a new router object.

- The AuthController module is imported to access the controller methods for user authentication.

- POST /register: This route is used to register a new user. It is associated with the AuthController.register method.

- POST /login: This route is used to log in a user. It is associated with the AuthController.login method.

- The router object is exported to be used by other parts of the application.
*/
