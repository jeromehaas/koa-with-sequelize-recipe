const { DataTypes } = require('sequelize');
const sequelize = require('../db/index.js');

// SETUP MODEL
const Job = sequelize.define('job', {
	id: {
		field: 'id',
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	title: {
		field: 'title',
		type: DataTypes.STRING,
	},
}, {
	tableName: 'jobs',
});

// EXPORTS
module.exports = Job;
