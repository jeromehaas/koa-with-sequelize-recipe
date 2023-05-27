const errorHandler = async (error, ctx) => {

	console.log(`🔥 ${ error.message }`);
	ctx.status = error.status;
	ctx.body = {
		success: false,
		message: error.message,
	};

};

module.exports = errorHandler;
