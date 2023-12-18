# Ensolvers Challenge - Documentation

## Description
This project is part of the Ensolvers Challenge and is a To-Do application that allows you to create, edit, categorize, and mark tasks as completed. Additionally, you can filter by title and category.

## Deploy
https://itsanothertodoapp.vercel.app/

## Project Structure
The project is structured as follows:

#### frontend: Contains the client code developed in React + Vite.
#### backend: Contains the backend server code developed in Node.js, Express, Postgres, and Sequelize.
#### database: Contains files related to the "To-Dos" database.

## Features
- To-Do List: Displays the available tasks in the database. 
- FormManager: Component that handles editing and creation forms.

# REST API
The application uses a REST API to manage tasks. Below are the available endpoints:

#### GET /api/todos: Retrieves a list of all tasks, with the option to filter by title or category.

#### GET /api/todos/{id}: Retrieves the details of a specific task.

#### POST /api/todos: Creates a new task.

#### PUT /api/todos/{id}: Updates the details of an existing task.

#### DELETE /api/todos/{id}: Deletes an existing task.

## API REST Documentation
### Swagger: 
https://todoappchallenge-production.up.railway.app/api-doc/

## Instructions for Running the Project Locally
Follow these steps to run the application locally:

## Frontend
Open a terminal and navigate to the frontend directory.
Run npm install to install client dependencies.
Run npm run dev to start the client development server.
## Backend
Open a terminal and navigate to the backend directory.
Run npm install to install server dependencies.
Configure the necessary environment variables (e.g., database connection string).
Run npm start to start the backend server.
The application will be available at https://localhost:5173 for the client and https://localhost:3001 for the backend server.
