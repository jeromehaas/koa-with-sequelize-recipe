const DataTypes = require('sequelize');
const sequelize = require('../db/index.js');

// SETUP MODEL
const Address = sequelize.define('address', {
	id: {
		field: 'id',
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	street: {
		field: 'street',
		type: DataTypes.STRING,
	},
	town: {
		field: 'town',
		type: DataTypes.STRING,
	},
	zipCode: {
		field: 'zip_code',
		type: DataTypes.INTEGER,
	},
	country: {
		field: 'country',
		type: DataTypes.STRING,
	},
}, {
	tableName: 'addresses',
});

// EXPORTS
module.exports = Address;
