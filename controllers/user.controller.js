const { User } = require('../models/index.js');
const cryptoService = require('../services/crypro.service.js');
const jwtService = require('../services/jwt.service.js');

// SIGN UP
const signup = async (ctx) => {

	try {

		// GET BODY
		const { body } = ctx.request;

		// CHECK EMAIL
		if (!body.email) {
			ctx.throw(400, 'Field email is not defined');
		};

		// CHECK PASSWORD
		if (!body.password) {
			ctx.throw(400, 'Field password is not defined');
		};

		// CHECK IF USER ALREADY EXISTS
		const existingUser = await User.findOne({
			where: { email: body.email },
		});
		if (existingUser) {
			ctx.throw(400, 'User already exists');
		};

		// HASH PASSWORD
		const hashedPassword = await cryptoService.hashPassword(body.password);

		// CREATE USER
		const user = await User.create({
			'email': 		body['email'],
			'password': hashedPassword,
		});

		// GET ALL USERS
		const users = await User.findAll({
			attributes: ['id', 'email'],
		});

		// SEND RESPONSE
		ctx.status = 201;
		ctx.body = {
			success: true,
			message: 'User has been created',
			data: {
				users: users,
			},
		};

	// HANDLE ERROS
	} catch (error) {
		ctx.throw(500, error);
	};

};

// GET ALL
const getAll = async (ctx) => {

	try {

		// GET USERS
		const users = await User.findAll({
			attributes: ['id', 'email'],
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			success: true,
			message: 'Users has been fetched',
			data: {
				users: users,
			},
		};

	// HANDLE ERRORS
	} catch (error) {
		ctx.throw(500, error);
	};

};

// ME
const me = async (ctx) => {

	try {

		// GET STATE
		const { state } = ctx;

		// GET USER
		const user = await User.findOne({
			where: { id: state.user.id },
		});

		// CHECK USER
		if (!user) {
			ctx.throw(400, 'User was not found');
		};

		// SEND RESONESE
		ctx.status = 200;
		ctx.body = {
			success: true,
			message: 'User has been fetched',
			data: {
				user: {
					id: user.id,
					email: user.email,
				},
			},
		};

	// HANDLE ERRORS
	} catch (error) {
		ctx.throw(500, error);
	};

};

// GET
const get = async (ctx) => {

	try {

		// GET PARAMS
		const { id } = ctx.request.params;

		// GET USER
		const user = await User.findOne({
			where: { id: id },
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			success: true,
			message: 'User has been fetched',
			data: {
				user: {
					id: user.id,
					email: user.email,
				},
			},
		};

	// HANDLE ERRORS
	} catch (error) {
		ctx.throw(404, error);
	};

};

// LOGIN
const login = async (ctx) => {

	try {

		// GET BODY
		const { body } = ctx.request;

		// CHECK EMAIL
		if (!body.email) {
			ctx.throw(500, 'Field password is not defined');
		};

		// CHECK PASSWORD
		if (!body.password) {
			ctx.throw(500, 'Field password is not defined');
		};

		// CHECK IF USER EXISTS
		const user = await User.findOne({
			where: { email: body.email },
		});
		if (!user) {
			ctx.throw(500, 'User does not exist');
		};

		// VERIFY PASSWORD
		const passwordIsValid = await cryptoService.comparePassword(body.password, user.password);
		if (!passwordIsValid) {
			ctx.throw(500, 'Password is not valid');
		};

		// CREATE TOKEN
		const token = await jwtService.issue({
			user: {
				id: user.id,
				email: user.email,
			},
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			success: true,
			message: 'Login was successfull',
			data: {
				user:  user,
				token: token,
			},
		};

	// HANDLE ERRORS
	} catch (error) {
		ctx.throw(500, error);
	};

};

// EXPORTS
module.exports = {
	signup,
	get,
	login,
	me,
	getAll,
};
