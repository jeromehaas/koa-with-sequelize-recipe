const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// SETUP DOTENV
dotenv.config();

// CONNECT DATABASE
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	logging: false,
	dialect: 'postgres',
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
	define: {
		timestamps: false,
	},
});

// DB AUTHENTICATE
db.authenticate()
	.then(() => {
		console.log('💾 Database is connected!');
	})
	.catch(() => {
		console.log('🔥 Error: could not connect to database!');
	});

// DB SYNC
db.sync()
	.then(() => {
		console.log('💫 Database sync successfull!');
	})
	.catch(() => {
		console.log('🔥 Error: sync failed!');
	});

// EXPORT
module.exports = db;
