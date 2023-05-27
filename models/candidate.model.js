const { DataTypes } = require('sequelize');
const sequelize = require('../db/index.js');

// SETUP MODEL
const Candidate = sequelize.define('candidate', {
	id: {
		field: 'id',
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	firstname: {
		field: 'firstname',
		type: DataTypes.STRING,
	},
	lastname: {
		field: 'lastname',
		type: DataTypes.STRING,
	},
	email: {
		field: 'email',
		type: DataTypes.STRING,
	},
}, {
	tableName: 'candidates',
});

// EXPORTS
module.exports = Candidate;
