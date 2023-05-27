const { Application, Candidate } = require('../models/index.js');

// CREATE
const create = async (ctx) => {

	try {

		// GET BODY
		const { body } = ctx.request;

		// CREATE CANDIDATE
		const candidate = await Candidate.create({
			'firstname': 	body['firstname'],
			'lastname': 	body['lastname'],
			'email': 			body['email'],
		});

		// CREATE APPLICATION
		const application = await Application.create({
			'job_id': 			body['job_id'],
			'candidate_id':	candidate['id'],
			'status': 			1,
		});

		// GET ALL APPLICATIONS
		const applications = await Application.findAll();

		// SEND RESPONSE
		ctx.status = 201;
		ctx.body = {
			message: 'Application has been created',
			applications: applications,
		};

	// HANDLE ERRORS
	} catch (error) {
		ctx.throw(500, error);
	};

};

// GET ALL
const getAll = async (ctx) => {

	try {

		// GET ALL APPLICATIONS
		const applications = await Application.findAll();

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			message: 'Applications has been fetched',
			applications: applications,
		};

	// HANDLE ERROR
	} catch (error) {
		ctx.throw(500, error);
	};

};

// EXPORTS
module.exports = {
	create,
	getAll,
};
