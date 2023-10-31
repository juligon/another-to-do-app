const { Task } = require("../db");
const { Op } = require("sequelize");

// Función para obtener todas las tareas y aplicar filtro por título y categoría
const getTasks = async (req, res, next) => {
	const { title, category } = req.query;
	let whereClause = {};

	if (title || category) {
		whereClause[Op.or] = [];

		if (title) {
			whereClause[Op.or].push({
				title: {
					[Op.iLike]: `%${title}%`,
				},
			});
		}

		if (category) {
			whereClause[Op.or].push({
				category: {
					[Op.iLike]: `%${category}%`,
				},
			});
		}
	}

	try {
		const tasks = await Task.findAll({
			where: whereClause,
		});

		if (tasks.length === 0) {
			const error = new Error(
				`Tasks not found for title: ${title}, category: ${category}`
			);
			error.status = 404;
			throw error;
		}

		res.json(tasks);
	} catch (error) {
		next(error);
	}
};

// Función para buscar una tarea por su ID
const getTaskById = async (req, res, next) => {
	const { id } = req.params;

	try {
		const task = await Task.findByPk(id);

		if (!task) {
			const error = new Error("Task not found");
			error.status = 404;
			throw error;
		}

		res.json(task);
	} catch (error) {
		next(error);
	}
};

// Función para crear una nueva tarea
const createTask = async (req, res, next) => {
	try {
		const { title, description, category, completed } = req.body;

		if (!title) {
			const error = new Error("Title are required");
			error.status = 400;
			throw error;
		}

		const existingTask = await Task.findOne({
			where: { title: { [Op.iLike]: `%${title}%` } },
		});

		if (existingTask) {
			const error = new Error("Task already exists");
			error.status = 409;
			throw error;
		}

		const newTask = await Task.create({
			title: title,
			description: description,
			category: category,
			completed: completed,
		});

		res.status(201).json(newTask);
	} catch (error) {
		next(error);
	}
};

// Función para eliminar una tarea por su ID
const deleteTask = async (req, res, next) => {
	const { id } = req.params;
	try {
		const deletedTask = await Task.destroy({
			where: { id: id },
		});
		if (deletedTask === 0) {
			const error = new Error("Task not found");
			error.status = 404;
			throw error;
		}
		res.json({ message: "Task successfully deleted" });
	} catch (error) {
		next(error);
	}
};

// Función para actualizar una tarea por su ID
const updateTask = async (req, res, next) => {
	const { id } = req.params;
	const { title, description, category, completed } = req.body;

	try {
		const task = await Task.findByPk(id);

		if (!task) {
			const error = new Error("Task not found");
			error.status = 404;
			throw error;
		}

		const updatedFields = {};
		if (title !== undefined) updatedFields.title = title;
		if (description !== undefined) {
			updatedFields.description =
				description !== null && description !== "" ? description : null;
		}
		if (category !== undefined) updatedFields.category = category;
		if (completed !== undefined) updatedFields.completed = completed;

		await task.update(updatedFields);

		const updatedTask = await Task.findOne({
			where: { id: id },
		});

		res.json(updatedTask);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getTasks,
	getTaskById,
	createTask,
	updateTask,
	deleteTask
};
