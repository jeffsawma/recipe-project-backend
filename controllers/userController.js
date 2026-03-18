// userController.js
// This file contains controller functions for user-related operations
import User from "../models/user.js"; // Importing the User model to interact with the users table
import bcrypt from "bcrypt"; // Importing bcrypt just to hash passwords securely
import jwt from "jsonwebtoken"; // Importing jsonwebtoken to create JWT tokens

// Register a new user (modified)
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    await User.create({ username, password: hashedPassword });

    // Success response
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error); // Log the exact error
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// User login
export const loginUser = async ( req, res ) => {
    try {
        const { username, password } = req.body; // Getting the username and password from req body

        // Finding the user in the database
        const user = await User.findOne({ where: { username } }); // Finding the user by username
        if(!user) {
            return res.status(404).json({ message: "User not found" }); // If user doesn't exist
        }

        // Compare password entered with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password); // Password is entered by the user // user.password is the hashed password in the database 
        if(!isMatch) {
            return res.status(401).json({ message: "Password is incorrect" }); // If password doesn't match
        }

        // Issuing a JWT token for the login user
        const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" }); // Temporary access for the valid user for 1 hour

        res.json({ message: "Login was successful", token }); // Sending a success response with the token 
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });// Handling any server errors
    }
};

// End of userController.js
