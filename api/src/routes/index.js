const { Router } = require("express");

// Imports
const todosRouter = require("./todos");

const router = Router();

// Routers
router.use("/todos", todosRouter);

module.exports = router;