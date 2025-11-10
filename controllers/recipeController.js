// recipeController.js
// This file contains controller functions for handling recipe-related operations
import Recipe from "../models/recipe.js"; // Importing the Recipe model to interact with the recipes table
import User from "../models/user.js"; // Importing the User model to interact with the users table

// Using async/await for handling asynchronous database operations
// Using try/catch blocks for error handling
// Creating a new recipe
export const createRecipe = async ( req, res ) => { // aync function to create a new recipe
    try {
        const { name, ingredients, instructions, category, imageUrl } = req.body; // Getting recipe details from req body
        const userId = req.userId; // Getting the user ID from the authenticated request

        const recipe = await Recipe.create({ // Creating a new recipe with the create method from the Recipe model
            name,
            ingredients,
            instructions,
            category,
            imageUrl,
            userId // Assigning the user ID to the recipe
        });

        res.status(201).json({ message: "Recipe was created successfully", recipe }); // Sending a success response
    } catch (error) { // Catching any errors
        res.status(500).json({ message: "Error creating recipe", error: error.message }); // Handling any server errors
    }
};

// Getting all the recipes
export const getAllRecipes = async (req, res) => { // Here in this async function we didn't use 'req' because we don't need any input from the user
    try {
        const recipes = await Recipe.findAll({ // Using findAll method to get all the recipes that are created and stored in the database // findAll is a static method of the Recipe model that returns all the recipes
            include: [{ model: User, attributes: ["username"] }] // Include the user who created the recipe by only including his username // We use "attributes" with username because we don't want to send the password to the user
        });
        res.json(recipes); // Sending the list of recipes to the user as a response
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipes", error: error.message });
    }
};

// Getting a specific recipe by its primary key id // For example: /api/recipe/:id
export const getRecipeById = async (req, res) => {
    try {
        const { id } = req.params; // Getting the recipe ID from params
        const recipe = await Recipe.findByPk(id); // Find recipe by the id of the recipe using findByPk
        if (!recipe) // If recipe doesn't exist
            return res.status(404).json({ message: "Recipe not found" });
        res.json(recipe); // Sending the recipe to the user as a response
    } catch (error) {
        res.status(500).json({ message: "Error fetching recipe", error: error.message });
    }
};

// Updating a recipe by its primary key id // For example: /api/recipe/:id
export const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params; // Getting the recipe ID from params
        const userId = req.userId; // Getting the user ID from the authenticated request

        const recipe = await Recipe.findByPk(id); // Find recipe by the id of the recipe using findByPk
        if (!recipe) // 
            return res.status(404).json({ message: "Recipe not found" }); // If recipe doesn't exist

        // Ensures user owns the recipe in order to update it (Only the user who created the recipe can update it based on the instructions of the project)
        if (recipe.userId !== userId) // If the id recipe don't match the id user
            return res.status(403).json({ message: "Not authorized to edit this recipe" });

        // Updating the recipe
        await recipe.update(req.body); // Updating the recipe with the new data
        res.json({ message: "Recipe was updated successfully", recipe });
    } catch (error) { 
        res.status(500).json({ message: "Error updating recipe", error: error.message });
    }
};

// Deleting a recipe
export const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId; 

        const recipe = await Recipe.findByPk(id); 
        if (!recipe) 
            return res.status(404).json({ message: "Recipe not found" });

        // Ensures user owns the recipe in order to delete it
        if (recipe.userId !== userId)
            return res.status(403).json({ message: "Not authorized to delete this recipe" });

        // Deleting the recipe
        await recipe.destroy(req.body); // We use destroy method to delete the recipe
        res.json({ message: "Recipe deleted successfully" });
    } catch (error) { // Catch any errors in the try block
        res.status(500).json({ message: "Error deleting recipe", error: error.message }); // Internal server error
    }
};

// End of recipeController.js

