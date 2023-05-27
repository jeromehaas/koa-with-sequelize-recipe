const { Job, Company, Address, Candidate } = require('../models/index.js');

// GET ALL
const getAll = async (ctx) => {

	try {

		// GET ALL COMPANIES
		const companies = await Company.findAll({
			attributes: ['id', 'name'],
			include: [
				{ model: Address, attributes: ['street', 'town', 'zip_code', 'country'] },
				{ model: Job, attributes: ['title'], include: [
					{ model: Candidate, attributes: ['firstname', 'lastname'] },
				] },
			],
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			message: 'companies has been fetched',
			data: {
				companies: companies,
			},
		};

	// HANDLE ERRORS
	} catch (error) {
		ctx.throw(500, error);
	};

};

// CREATE
const create = async (ctx) => {

	try {

		// GET BODY
		const { body } = ctx.request;

		// CREATE COMPANY
		const company = await Company.create({
			'name': body['name'],
		});

		// CREATE ADDRESS
		await Address.create({
			'street': 		body['address']['street'],
			'town': 			body['address']['town'],
			'zipCode': 		body['address']['zipCode'],
			'country': 		body['address']['country'],
			'company_id': company['dataValues']['id'],
		});

		// GET ALL COMPANIES
		const companies = await Company.findAll({
			include: [
				{ model: Address, attributes: ['street', 'town', 'zipCode', 'country'] },
			],
		});

		// SEND RESPONSE
		ctx.status = 201;
		ctx.body = {
			message: 'Company has been created',
			companies: companies,
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

		// GET COMPANY
		const company = await Company.findOne({
			where: { id: id },
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			message: 'Company has been fetched',
			data: {
				company: company,
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

		// DESTROY COMPANY
		await Company.destroy({
			where: { id: id },
		});

		// GET ALL COMPANIES
		const companies = await Company.findAll({
			include: [
				{ model: Address, attributes: ['street', 'town', 'zipCode', 'country'] },
			],
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			message: 'Company has been deleted',
			data: {
				companies: companies,
			},
		};

	} catch (error) {
		ctx.throw(500, error);
	}

};

// UPDATE
const update = async (ctx) => {

	try {

		// GET PARAMS
		const { id } = ctx.request.params;

		// GET BODY
		const { body } = ctx.request;

		// UPDATE COMPANY
		await Company.update(
			body,
			{ where: { id: id } },
		);

		// GET ALL COMPANIES
		const companies = await Company.findAll({
			include: [
				{ model: Address, attributes: ['street', 'town', 'zipCode', 'country'] },
			],
		});

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			message: 'Company has been updated',
			data: {
				companies: companies,
			},
		};

	} catch (error) {
		ctx.throw(500, error);
	};

};

// EXPORTS
module.exports = {
	get,
	getAll,
	create,
	destroy,
	update,
};
