// recipeRoutes.js
// This file defines the routes for recipe-related operations in the Express app
// Defines routes for creating, reading, updating and deleting recipes (CRUD)

import express from "express"; // Importing the Express framework
import { Router } from "express"; // Importing the Router class from Express to create routes
import { authenticateToken }  from "../middlewares/authMiddleware.js";
import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe } from "../controllers/recipeController.js"; // Importing controller functions for recipe CRUD operations


// Creating a new router instance to handle recipe-related routes
const router = Router();

// All the recipe actions require authentication (middleware)
router.post("/", authenticateToken, createRecipe); // Creating a new recipe
router.get("/", authenticateToken, getAllRecipes); // Getting all the recipes
router.get("/:id", authenticateToken, getRecipeById); // Getting a specific recipe by id
router.put("/:id", authenticateToken, updateRecipe); // Updating a specific recipe by id
router.delete("/:id", authenticateToken, deleteRecipe); // Deleting a specific recipe by id 

// Exporting the router instance to use it somewhere else in the project
export default router;

// End of recipeRoutes.js
