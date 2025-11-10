// userRoutes.js
// This file contains routes for user-related operations in the Express app
// Defines routes for user registration and login(sign up and log in)

import { Router } from "express"; // Importing the Router class from Express to create routes
import { registerUser, loginUser } from "../controllers/userController.js"; // Importing the two controller functions for user registration and login

// Creating a new router instance to handle user-related routes
const router = Router(); //  Router is used to create routes

//  Register a new user
router.post("/register", registerUser);

// Login existing user
router.post("/login", loginUser);

// Exporting the router instance to use it somewhere else in the project
export default router;

// End of userRoutes.js
