const { Router } = require("express");

// Imports
const tasksRouter = require("./tasks");

const router = Router();

// Routers
router.use("/tasks", tasksRouter);

module.exports = router;