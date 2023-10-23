const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Todo = sequelize.define(
		"Todo",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			title: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			description: {
				type: DataTypes.TEXT,
			},
			category: {
				type: DataTypes.ENUM("Urgent", "Important", "Later"),
			},
			completed: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
	);

	return Todo;
};