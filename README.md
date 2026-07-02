# Recipe Management Backend 🍳

## Overview

This is the backend for a full-stack recipe management application I built as part of my web development program. It provides user authentication and allows authenticated users to create, view, update, and delete their own recipes.

The API is built with Node.js and Express, uses Sequelize as the ORM, and connects to a MySQL database hosted on Clever Cloud. The application is deployed on Render.

---

## Live API

https://recipe-project-backend-mny2.onrender.com

---

## Live Frontend

https://recipe-project-frontend-vbr6.onrender.com/login

---

## Frontend Repository

https://github.com/jeffsawma/recipe-project-frontend

---

## Features

- User registration and login using JWT authentication
- Protected recipe routes
- Full CRUD operations for recipes
- Each recipe belongs to a specific user
- Users can only edit or delete recipes they created
- CORS configured for both local development and the deployed frontend

---

## Tech Stack

- Node.js
- Express
- Sequelize
- MySQL (Clever Cloud)
- JSON Web Tokens (JWT)
- Render

---

## API Routes

### User Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/register` | Register a new user |
| POST | `/users/login` | Login and receive a JWT token |

### Recipe Routes (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/recipes` | Retrieve all recipes |
| GET | `/recipes/:id` | Retrieve a specific recipe |
| POST | `/recipes` | Create a new recipe |
| PUT | `/recipes/:id` | Update an existing recipe |
| DELETE | `/recipes/:id` | Delete a recipe |

---

## Authentication

All recipe endpoints require a valid JWT.

Example request header:

```http
Authorization: Bearer <your_token>
```

---

## Demo Account

You can use the following account to test the deployed application:

```text
Username: Tester
Password: 0000
```

---

## Database

The application uses MySQL with Sequelize.

Main tables:

- users
- recipes

Each recipe is associated with a single user through a foreign key relationship.

---

## Running Locally

```bash
cd backend
npm install
npm start
```

---

## Notes

- The API does not expose a root (`/`) endpoint since it is designed to be consumed by the frontend application.
- The database schema is synchronized on startup using `sequelize.sync()`.
- JWT authentication protects all recipe endpoints.
- The frontend automatically includes the authentication token in protected requests.

---

## About this Project

I originally built this project during my web development program. A few months later, I revisited it to improve the overall quality by cleaning up the code, fixing deployment issues, refining the authentication flow, improving the user experience, and preparing it as a portfolio project.
