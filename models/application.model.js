const { DataTypes } = require('sequelize');
const sequelize = require('../db/index.js');

// SETUP MODEL
const Application = sequelize.define('application', {
	id: {
		field: 'id',
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	status: {
		field: 'status',
		type: DataTypes.INTEGER,
	},
}, {
	tableName: 'applications',
});

// EXPORTS
module.exports = Application;
