// app.js
// This file is the main entry point for the Express app

import express from "express"; // Importing the Express framework
import cors from "cors"; // Import CORS
import sequelize from "./config/database.js"; // Importing the database cnx instance
import userRoutes from "./routes/userRoutes.js"; // Importing routes for user-related operations
import recipeRoutes from "./routes/recipeRoutes.js"; // Importing routes for recipe-related operations
import errorHandler from "./middlewares/errorHandler.js"; // Importing the error handler middleware

// Creating a new Express app
const app = express(); // Express is a web framework for Node.js

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://recipe-project-frontend-vbr6.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware to parse JSON bodies in incoming requests
app.use(express.json()); // Parsing JSON data from the request body

// Mounting routes 
app.use("/users", userRoutes); // Mounting the user routes at "/users" path 
app.use("/recipes", recipeRoutes); // Mounting the recipe routes at "/recipes" path

// Error handling middleware
app.use(errorHandler); // Using the error handler middleware to handle errors

// Using environment port if available from (Render), or else default to 3000
const PORT = process.env.PORT || 3000;

// Syncing the database and starting the server
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// Exporting the app instance
export default app;

