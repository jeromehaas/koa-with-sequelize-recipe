const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// SETUP DOTENV
dotenv.config();

const issue = async (payload) => {

	// CREATE TOKEN
	const token = await jwt.sign({
		exp: Math.floor(Date.now() / 1000) + (60 * 60),
		data: payload,
	}, process.env.JWT_SECRET);

	// RETURN TOKEN
	return token;

};

// VERIFY TOKEN
const verify = async (token) => {

	// DECODE TOKEN
	const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

	// RETURN VERIFIED TOKEN
	return decodedToken;

};

// EXPORTS
module.exports = {
	issue,
	verify,
};
