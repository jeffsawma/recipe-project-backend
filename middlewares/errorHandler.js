// errorHandler.js
// This file defines a middleware for handling errors in the Express app (Standard error handler middleware)
// The goal is to help trace where an error happened and why
export default function errorHandler(err, req, res, next) { // Using a default function to handle errors
    console.error(err.stack); // Logging error messages to the console for debugging purposes // .stack property belongs to JavaScript
    res.status(500).json({ message: "Internal Server Error" }); // Just sending a generic error message to the user
}

// End of errorHandler.js
