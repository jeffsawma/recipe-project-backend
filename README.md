# Recipe Management Backend 🍳

## Overview

This is the backend for a full-stack recipe application I built. It handles user authentication and allows users to create, read, update, and delete recipes.

The API is built with Node.js and Express, uses Sequelize as an ORM, and connects to a MySQL database hosted on Clever Cloud. The app is deployed on Render.

---

## Live API

https://recipe-project-backend-mny2.onrender.com

---

## Features

* User registration and login (JWT authentication)
* Protected routes for recipes
* Full CRUD operations for recipes
* Each recipe is linked to a user
* CORS configured for local and deployed frontend

---

## Tech Stack

* Node.js
* Express
* Sequelize
* MySQL (Clever Cloud)
* JWT
* Render

---

## Routes

### User routes

* `POST /users/register` → create a new user
* `POST /users/login` → login and receive a token

### Recipe routes (protected)

* `GET /recipes` → get all recipes
* `GET /recipes/:id` → get one recipe
* `POST /recipes` → create a recipe
* `PUT /recipes/:id` → update a recipe
* `DELETE /recipes/:id` → delete a recipe

---

## Authentication

Most routes require a token.

Example header:

```
Authorization: Bearer <your_token>
```

---

## Demo account

You can use this account to test the app:

```
username: Test
password: test
```

---

## Database

The app uses MySQL with Sequelize.

There are two main tables:

* users
* recipes

Each recipe belongs to a user.

---

## Running locally

```
cd backend
npm install
npm start
```

---

## Notes

* The API doesn’t have a root route (`/`) since it’s meant to be used by the frontend.
* Sequelize is set to `sync({ alter: true })`, which updates the schema automatically.
* CORS is restricted to the frontend URLs (local + deployed).

---

## About this project

I originally built this project a few months ago and recently revisited it to clean it up, fix deployment details, and better understand the architecture end-to-end.

It’s part of my portfolio to showcase full-stack development with authentication and database integration.
