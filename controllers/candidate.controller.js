const { Candidate } = require('../models/index.js');

// GET ALL
const getAll = async (ctx) => {

	try {

		// GET ALL CANDIDATES
		const candidates = await Candidate.findAll();

		// SEND RESPONSE
		ctx.status = 200;
		ctx.body = {
			message: 'Candidates has been fetched',
			data: {
				candidates: candidates,
			},
		};

	// HANDLE ERRORS
	} catch (error) {
		ctx.throw(500, error);
	};

};

module.exports = {
	getAll,
};
