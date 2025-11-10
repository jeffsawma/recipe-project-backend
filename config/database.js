// database.js
// This file sets up the connection between Sequelize and MySQL database
// Using Sequelize (ORM) that let us interact with the database using JavaScript instead of SQL

// Importing Sequelize from the installed library
import { Sequelize } from "sequelize"; // ORM or object relational mapping for Node.js 
import app from "../app.js"; // Importing the Express app

// Creating a new Sequelize instance to connect to MySQL database
const sequelize = new Sequelize(
    "byqmems5kcywhyqx30y3",  // Replacing this with Clever Cloud db name later on
    "uyl8kjjjyqpani0t",      // Replacing this with the Clever Cloud username later on
    "4T4LGCPJYyByOsW6gQ6o",  // Replacing this with the Clever Cloud password later on
    {
        host: "byqmems5kcywhyqx30y3-mysql.services.clever-cloud.com", // Replacing this with the host address that is also given by Clever Cloud
        dialect: "mysql", // Specifying that we are using MySQL as our database
        port: 3306 // Replacing this with the port number that is also given by Clever Cloud
    }
);

// Testing the connection to ensure everything is set up correctly
sequelize
    .authenticate() // Authenticating the connection
    .then(() => { // If the connection is successful
        console.log("Connection to the database has been established successfully.");
    })
    .catch((error) => { // If the connection fails
        console.error("Unable to connect to the database:", error);
    });

// Exporting the sequelize instance to use it somewhere else in the project
export default sequelize; 

// End of database.js
