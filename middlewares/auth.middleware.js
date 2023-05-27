const { User } = require('../models/index');
const jwtService = require('../services/jwt.service.js');

const auth = async (ctx, next) => {

	try {

		// CHECK HEADERS
		if (!ctx.req.headers || !ctx.req.headers.authorization) {
			ctx.throw(401, 'Authorization header is not sent');
		};

		// GET TOKEN
		const token = ctx.req.headers.authorization;

		// DECODE TOKEN
		const decodedToken = await jwtService.verify(token);

		const user = await User.findOne({
			where: { id:  decodedToken.data.user.id },
		});

		// CHECK IF USER EXISTS
		if (!user) {
			ctx.throw(401, 'User does not exist');
		};

		// APPEND USER TO STATE
		ctx.state.user = {
			id: user.id,
			email: user.email,
		};

		// EXECUTE NEXT FUNCTION
		await next();

	// HANDLE ERRORS
	} catch (error) {
		ctx.throw(500, error);
	}

};

module.exports = auth;
