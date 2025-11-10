// userController.js
// This file contains controller functions for user-related operations
import User from "../models/user.js"; // Importing the User model to interact with the users table
import bcrypt from "bcrypt"; // Importing bcrypt just to hash passwords securely
import jwt from "jsonwebtoken"; // Importing jsonwebtoken to create JWT tokens

// Registring a new user
export const registerUser = async ( req, res ) => { // Using async/await for handling asynchronous database operations
    try { // Using try/catch blocks for error handling
        const { username, password } = req.body; // Getting the username and password from the req body that comes from the user
        if (!username || !password) { // If one of the fields is missing, return an error
            return res.status(400).json({ message: "Username and password are required" }); // Validating input
        }
        // Hashing the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds for hashing which makes it extremely difficult to crack

        // Creating a new user in the database
        const newUser = await User.create({ username, password: hashedPassword }); // Usinf hashedPassword instead of password when creating the user

        res.status(201).json({ message: "User registered successfully", user: newUser }); // Sending a success response that the user was registered
    } catch (error) { // Returning any errors that might occur when registering as internal server error
        res.status(500).json({ message: "Error registering user", error : error.message });
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
