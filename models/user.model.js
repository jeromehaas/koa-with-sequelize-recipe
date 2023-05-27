const { DataTypes } = require('sequelize');
const sequelize = require('../db/index.js');

// SETUP MODEL
const User = sequelize.define('user', {
	id: {
		field: 'id',
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	email: {
		field: 'email',
		allowNull: false,
		unique: true,
		type: DataTypes.STRING,
	},
	password: {
		field: 'password',
		type: DataTypes.STRING,
	},
}, {
	tableName: 'users',
});

// EXPORTS
module.exports = User;
