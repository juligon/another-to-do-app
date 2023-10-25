const { Todo } = require("../db");
const { Op } = require("sequelize");

// Función para obtener todos los To-Dos y aplicar filtro por título y categoría
const getToDos = async (req, res, next) => {
  const { title, category } = req.query;
  let whereClause = {};

  if (title) {
    whereClause.title = {
      [Op.iLike]: `%${title}%`,
    };
  }

  try {
    const todos = await Todo.findAll({
      where: whereClause,
    });

    if (category) {
      const filteredTodos = todos.filter(todo => todo.category.toLowerCase() === category.toLowerCase());
      res.json(filteredTodos);
    } else {
      res.json(todos);
    }
  } catch (error) {
    next(error);
  }
};


// Función para buscar un To-Do por su ID
const getToDoById = async (req, res, next) => {
	const { id } = req.params;

	try {
		const todo = await Todo.findByPk(id);

		if (!todo) {
			const error = new Error("To-Do not found");
			error.status = 404;
			throw error;
		}

		res.json(todo);
	} catch (error) {
		next(error);
	}
};

// Función para crear un nuevo To-Do
const createToDo = async (req, res, next) => {
	try {
		const { title, description, category, completed } = req.body;

		if (!title) {
			const error = new Error("Title are required");
			error.status = 400;
			throw error;
		}
		
		const existingToDo = await Todo.findOne({
			where: { title: { [Op.iLike]: `%${title}%` } },
		});

		if (existingToDo) {
			const error = new Error("To-Do already exists");
			error.status = 409;
			throw error;
		}

		const newToDoData = {
			title: title,
			category: category,
			completed: completed
		};

		if (description !== undefined && description !== null && description !== "") {
			newToDoData.description = description;
		}

		const newToDo = await Todo.create(newToDoData);

		res.status(201).json(newToDo)
	} catch (error) {
		next(error);
	}
};

// Función para eliminar un To-Do por su ID
const deleteToDo = async (req, res, next) => {
	const { id } = req.params;
	try {
		const deletedToDo = await Todo.destroy({
			where: { id: id },
		});
		if (deleteToDo === 0) {
			const error = new Error("To-Do not found");
			error.status = 404;
			throw error;
		}
		res.json({ message: "To-Do successfully deleted" });
	} catch (error) {
		next(error);
	}
};

// Función para actualizar un To-Do por su ID
const updateToDo = async (req, res, next) => {
	const { id } = req.params;
	const { title, description, category, completed } = req.body;

	try {
		const todo = await Todo.findByPk(id);

		if (!todo) {
			const error = new Error("To-Do not found");
			error.status = 404;
			throw error;
		}

		// Actualiza solo las propiedades que se proporcionan en el cuerpo de la solicitud
		const updatedFields = {};
		if (title) updatedFields.title = title;
		if (description) updatedFields.description = description;
		if (category) updatedFields.category = category;
		if (completed !== undefined) updatedFields.completed = completed;

		await todo.update(updatedFields);

		const updatedToDo = await Todo.findOne({
			where: { id: id },
		});

		res.json(updatedToDo);
	} catch (error) {
		next(error);
	}
};


module.exports = {
  getToDos,
	getToDoById,
  createToDo,
  deleteToDo,
  updateToDo,
};



