const { Todo } = require("../db");
const { Op } = require("sequelize");

// Función para obtener todos los To-Dos y aplicar filtro por título y categoría
const getToDos = async (req, res, next) => {
  
  const title = req.query.title || '';
	const category = req.query.category || '';


  const whereClause = buildWhereClause(title, category);

  try {
    const todos = await fetchToDos(whereClause);
    handleNoToDosFound(todos, title, category);
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

const buildWhereClause = (title, category) => {
  const whereClause = { [Op.or]: [] };

  if (isPredefinedCategory(title)) {
    whereClause[Op.or].push(buildCategorySearch(title));
  } else {
    if (title) whereClause[Op.or].push(buildTitleSearch(title));
    if (category) whereClause[Op.or].push(buildCategorySearch(category));
  }

  return whereClause;
};


const isPredefinedCategory = (value) => {
  const predefinedCategories = ["urgent", "important", "later"];
  return predefinedCategories.includes(value);
};

const buildCategorySearch = (value) => ({
  category: { [Op.iLike]: `%${value}%` },
});

const buildTitleSearch = (value) => ({
  title: { [Op.iLike]: `%${value}%` },
});

const fetchToDos = (whereClause) => Todo.findAll({ where: whereClause });

const handleNoToDosFound = (todos, title, category) => {
  if (todos.length === 0) {
    const error = new Error(
      `To-Dos not found for title: ${title}, category: ${category}`
    );
    error.status = 404;
    throw error;
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

		const newToDo = await Todo.create({
			title: title,
			description: description,
			category: category,
			completed: completed,
		});

		res.status(201).json(newToDo);
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

		const updatedFields = {};
		if (title !== undefined) updatedFields.title = title;
		if (description !== undefined) {
			updatedFields.description =
				description !== null && description !== "" ? description : null;
		}
		if (category !== undefined) updatedFields.category = category;
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
