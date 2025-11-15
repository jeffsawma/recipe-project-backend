// app.js
// This file is the main entry point for the Express app

import express from "express"; // Importing the Express framework
import cors from "cors"; // Import CORS
import sequelize from "./config/database.js"; // Importing the database cnx instance
import userRoutes from "./routes/userRoutes.js"; // Importing routes for user-related operations
import recipeRoutes from "./routes/recipeRoutes.js"; // Importing routes for recipe-related operations
import errorHandler  from "./middlewares/errorHandler.js"; // Importing the error handler middleware

// Creating a new Express app
const app = express(); // Express is a web framework for Node.js

// Code for CORS (modified)
// Enable CORS so front-end can communicate with backend
const corsOptions = {
    origin: '*', // Accepter toutes les origines
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Autoriser ces méthodes
    allowedHeaders: ['Content-Type', 'Authorization'], // Autoriser ces en-têtes
  };
 
app.use(cors(corsOptions));

// Middleware to parse JSON bodies in incoming requests
app.use(express.json()); // Parsing JSON data from the request body

// Mounting routes 
app.use("/users", userRoutes); // Mounting the user routes at "/users" path 
app.use("/recipes", recipeRoutes); // Mounting the recipe routes at "/recipes" path

// Error handling middleware
app.use(errorHandler); // Using the error handler middleware to handle errors

// Using environment port if available from (Clever Cloud), or else default to 3000
const PORT = process.env.PORT || 3000; // Using the PORT environment variable if available

// Syncing the database and starting the server
sequelize.sync({ alter: true }) // Updating the table structure if needed
    .then(() => { // If the sync is successful
        console.log("Database synced successfully."); // Logging a success message
        app.listen(PORT, () => { // Starting the server and listening on the specified port
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => { // If the sync fails
        console.error("Error syncing database:", error); // Logging the error
    });

// Exporting the app instance to use it somewhere else in the project
export default app;

// End of app.js
