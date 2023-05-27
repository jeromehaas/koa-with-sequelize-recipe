const { DataTypes } = require('sequelize');
const sequelize = require('../db/index.js');

// SETUP MODEL
const Company = sequelize.define('company', {
	id: {
		field: 'id',
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	name: {
		field: 'name',
		unique: true,
		type: DataTypes.STRING,
	},
}, {
	tableName: 'companies',
	indexes: [
		{ fields: ['name'], unique: true },
	],
});

// EXPORTS
module.exports = Company;
