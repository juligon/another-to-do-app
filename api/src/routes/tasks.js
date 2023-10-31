const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController"); 

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Tasks management
 * components:
 *  schemas:
 *   Task:
 *    type: object
 *    properties:
 *      title:
 *        type: string
 *        description: Task title
 *      description:
 *        type: text
 *        description: Task description
 *      category:
 *        type: string
 *        description: Task category
 *      completed:
 *        type: boolean
 *        description: Task status
 *    required:
 *      - title
 *      - category
 *    example:
 *      title: Task example
 *      description: Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
 *      category: Important
 *      completed: false
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a Task by ID
 *     tags: [Task]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Task identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Task obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '404':
 *         description: Task not found
 */

// Ruta para obtener una tarea por su ID
router.get("/:id", taskController.getTaskById);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks with optional filters
 *     tags: [Task]
 *      parameters:
 *       - name: title
 *         in: query
 *         description: Filter tasks by title (optional)
 *         schema:
 *           type: string
 *       - name: category
 *         in: query
 *         description: Filter tasks by category (optional)
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Tasks obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       '404':
 *         description: No tasks found
 */

// Ruta para obtener todas las tareas o filtrar por título o categoría
router.get("/", taskController.getTasks);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     requestBody:
 *       description: Task to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '201':
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '400':
 *         description: Invalid data format
 */

// Ruta para crear una nueva tarea
router.post("/", taskController.createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Task]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Task identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Task deleted successfully
 *       '404':
 *         description: Task not found
 */

// Ruta para eliminar una tarea por su ID
router.delete("/:id", taskController.deleteTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Task]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Task identifier
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated task data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       '200':
 *         description: Task updated successfully
 *       '404':
 *         description: Task not found
 */

// Ruta para actualizar una tarea por su ID
router.put("/:id", taskController.updateTask);


module.exports = router;