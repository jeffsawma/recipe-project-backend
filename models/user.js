// user.js
// This file is for defining the User model in the database using Sequelize
import { DataTypes } from "sequelize"; // Importing to define data types for the model attributes
import sequelize from "../config/database.js"; // Importing the database cnx instance

// Defining the User model with its attributes
const User = sequelize.define("User", { // Defining the User model using sequelize define method to create a table in the database
    id: {
        type: DataTypes.INTEGER.UNSIGNED, // Unsigned integer for the user ID means no negative values
        primaryKey: true, // Defining the primary key
        autoIncrement: true // Auto-incrementing the user ID
    },
    username: {
        type: DataTypes.STRING, // Defining the username attribute as a string
        allowNull: false, // Username shouldn't be null
        unique: true // Username should be unique
    },
    password: {
        type: DataTypes.STRING, // Defining the password attribute as a string
        allowNull: false // Password shouldn't be null // Password should be stocked securely and shouldn't be unique
    }
}, {
    tableName: "users", // Specifying the table name in the database
    timestamps: true // Enabling timestamps
});

// Exporting the sequelize instance to use it somewhere else in the project
export default User;

// End of user.js
