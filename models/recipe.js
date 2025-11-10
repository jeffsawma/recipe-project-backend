// recipe.js
// This file is for defining the Recipe model in the database using Sequelize
import { DataTypes } from "sequelize"; // Importing to define data types for the recipe attributes
import sequelize from "../config/database.js"; // Importing the database cnx instance
import User from "./user.js"; // Importing the User model to set up associations

// Defining the Recipe model with its attributes
const Recipe = sequelize.define("Recipe", {
    id: {
        type: DataTypes.INTEGER, // Integer for the recipe ID
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING, // String for the recipe name
        allowNull: false
    },
    ingredients: { // Text for the recipe ingredients
        type: DataTypes.TEXT,
        allowNull: false
    },
    instructions: { // Text for the recipe instructions
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: { // String for the recipe category
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: { // String for the recipe image
        type: DataTypes.STRING, // Url of the image stored for the recipe
        allowNull: true
    },
    userId: { // Integer for the user ID
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
}, {
    tableName: "recipes", // Specifying the table name in the database
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Defining the relationship between the Recipe and User models

// Rules of associations:
// Each recipe belong to a single user
// Each user can have many recipes created by them
User.hasMany(Recipe, { foreignKey: "userId", onDelete: "CASCADE" }); // A user can have many recipes not only one // If a user is deleted, all their recipes are deleted too
Recipe.belongsTo(User, { foreignKey: "userId" }); // A recipe belongs to a single user only

// Exporting the Recipe model to use it in controllers and routes
export default Recipe;

// End of recipe.js



