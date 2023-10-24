const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController"); 

/**
 * @swagger
 * tags:
 *   name: To-Do
 *   description: To-Dos management
 * components:
 *  schemas:
 *   Todo:
 *    type: object
 *    properties:
 *      title:
 *        type: string
 *        description: To-Do title
 *      description:
 *        type: text
 *        description: To-Do description
 *      category:
 *        type: string
 *        description: To-Do category
 *      completed:
 *        type: boolean
 *        description: To-Do status
 *    required:
 *      - title
 *    example:
 *      title: To-Do example
 *      description: Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
 *      category: Important
 *      completed: false
 */

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a To-Do by ID
 *     tags: [To-Do]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: To-Do identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: To-Do obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       '404':
 *         description: To-Do not found
 */

// Ruta para obtener un To-Do por su ID
router.get("/:id", todoController.getToDoById);

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all To-Dos with optional filters
 *     tags: [To-Do]
 *      parameters:
 *       - name: title
 *         in: query
 *         description: Filter To-Dos by title (optional)
 *         schema:
 *           type: string
 *       - name: category
 *         in: query
 *         description: Filter To-Dos by category (optional)
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: To-Dos obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       '404':
 *         description: No To-Dos found
 */

// Ruta para obtener todos los To-Dos
router.get("/", todoController.getToDos);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new To-Do
 *     tags: [To-Do]
 *     requestBody:
 *       description: To-Do to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       '201':
 *         description: To-Do created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       '400':
 *         description: Invalid data format
 */

// Ruta para crear un nuevo To-Do
router.post("/", todoController.createToDo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a To-Do by ID
 *     tags: [To-Do]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: To-Do identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: To-Do deleted successfully
 *       '404':
 *         description: To-Do not found
 */

// Ruta para eliminar un To-Do por su ID
router.delete("/:id", todoController.deleteToDo);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a To-Do by ID
 *     tags: [To-Do]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: To-Do identifier
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated To-Do data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       '200':
 *         description: To-Do updated successfully
 *       '404':
 *         description: To-Do not found
 */

// Ruta para actualizar un To-Do por su ID
router.put("/:id", todoController.updateToDo);


module.exports = router;