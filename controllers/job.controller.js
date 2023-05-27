const { Job, Company, Address, Candidate } = require('../models/index.js');

// GET ALL
const getAll = async (ctx) => {

	try {

		// GET JOBS
		const jobs = await Job.findAll({
			attributes: ['id', 'title'],
			include: [
				{ model: Company, attributes: ['name'] },
				{ model: Candidate, attributes: ['firstname', 'lastname'] },
			],
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			message: 'Jobs has been fetched',
			data: {
				jobs: jobs,
			},
		};

	// HANDLE ERRORS
	} catch (error) {
		console.error(error);
	};

};

// CREATE
const create = async (ctx) => {

	try {

		// GET BODY
		const { body } = ctx.request;

		// CREATE JOB
		await Job.create({
			'title': 			body['title'],
			'company_id': body['company_id'],
		});

		// GET JOBS
		const jobs = await Job.findAll({
			attributes: ['id', 'title'],
			include: [
				{ model: Company, attributes: ['id', 'name'], include: [
					{ model: Address, attributes: ['street', 'town', 'zipCode', 'country'] },
				] },
			],
		});

		// SEND RESPONSE
		ctx.status = 201;
		ctx.body = {
			message: 'Job has been created',
			data: {
				jobs: jobs,
			},
		};

	// HANDLE ERRORS
	} catch (error) {
		ctx.throw(500, error);
	};

};

// DESTROY
const destroy = async (ctx) => {

	try {

		// GET PARAMS
		const { id } = ctx.request.params;

		// DESTROY JOB
		await Job.destroy({
			where: { id: id },
		});

		// GET ALL JOBS
		const jobs = await Job.findAll();

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			message: 'Job has been deleted',
			jobs: jobs,
		};

	// HANDLE ERRORS
	} catch (error) {
		ctx.throw(500, error);
	};

};

// EXPORTS
module.exports = {
	getAll,
	create,
	destroy,
};
