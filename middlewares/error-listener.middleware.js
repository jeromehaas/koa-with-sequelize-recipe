const errorListener = async (ctx, next) => {

	try {

		// EXECUTE NEXT FUNCTION
		await next();

	// HANDLE ERRORS
	} catch (error) {

		// EMIT ERROR
		ctx.app.emit('error', error, ctx);
	};

};

module.exports = errorListener;
