const { Router } = require("express");
const errorHandler = require("../controllers/errorHandler");

// Imports
const todosRouter = require("./todos");

const router = Router();

// Routers
router.use("/todos", todosRouter);

// Middleware manejo de errores
router.use(errorHandler);

module.exports = router;