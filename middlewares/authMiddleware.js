// authMiddleware.js
// This file defines a middleware for authenticating users in the Express app

import jwt from "jsonwebtoken"; // Importing jsonwebtoken to verify JWT tokens

export const authenticateToken = (req, res, next) => { // Middleware function to authenticate users and has access to req, res and next
    try { // Using try-catch block
        const authHeader = req.headers.authorization; // Getting the Authorization header from the request

        // Checking if client provided a token // We will be checking the Authorization header with the format "Bearer <token>" 
        if (!authHeader) { // If no token is provided
            return res.status(401).json({ message: "No token provided here" }); // Respond with 401 if no token is provided or it is expired or invalid 
        }

        const token = authHeader.split(" ")[1]; // Extracting the token from the "Bearer <token>" format // Two parts separated by a space // [1] used as an index to separate the second part of the first part of the token
        const decoded = jwt.verify(token, "secret_key"); // Verifying the token from the client // secret_key is the secret key used to sign the token

        req.userId = decoded.id; // Attaching user ID from token to request
        next(); // Passing control to the next middleware if authentication is successful
    } catch (error) { // Catching any errors
        res.status(403).json({ message: "Invalid or expired token" }); // Responding with 403 if token is invalid or expired
    }
};

// End of authMiddleware.js



