const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema

// Create a new mongoose schema for the user model
const userSchema = new mongoose.Schema({
  // Username field
  username: {
    type: String,
    unique: true,
    required: true,
  },
  // Email field
  email: {
    type: String,
    unique: true,
    required: true,
  },
  // Password field
  password: {
    type: String,
    required: true,
  },
  // Birthdate field
  birthdate: {
    type: Date,
    required: true,
  },
  // Social login provider field
  socialLoginProvider: String,
  // Social login ID field
  socialLoginId: String,
  // Name field
  name: String,
  // Avatar field
  avatar: String,
  // Bio field
  bio: String,
  // CreatedAt field
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // UpdatedAt field
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // Likes field
  likes: {
    type: Number,
    default: 0,
  },
  // Followers field
  followers: {
    type: Number,
    default: 0,
  },
  // Views field
  views: {
    type: Number,
    default: 0,
  },
  // Admin field
  admin: {
    type: Boolean,
    default: false,
  },
});

// Hash the password before saving it to the database

// Use the pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  try {
    // Check if the password is modified
    if (!this.isModified('password')) {
      return next();
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Set the hashed password as the user's password
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Custom method to compare the provided password with the hashed password

// Add a custom method to the user schema to compare passwords
userSchema.methods.comparePassword = async function (password) {
  try {
    // Compare the provided password with the hashed password
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

// Create the User model using the user schema

// Create the User model using the user schema and name it 'User'
const User = mongoose.model('User', userSchema);

module.exports = User;

/*
Explanation:

- The code above defines the user model using Mongoose.

- The user model represents a user entity in the application, with various fields such as username, email, password, birthdate, etc.

- The userSchema variable holds the Mongoose schema definition for the user model.

- Each field in the schema is defined with its respective type and any additional properties such as uniqueness, required status, and default values.

- The userSchema.pre('save', ...) method is a pre-save middleware that is executed before saving a user to the database. It hashes the password using bcrypt.

- The userSchema.methods.comparePassword(...) method is a custom method added to the user schema. It compares the provided password with the hashed password stored in the database.

- Finally, the User model is created using mongoose.model('User', userSchema), and the model is exported to be used by other parts of the application.
*/
