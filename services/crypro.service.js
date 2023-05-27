const bcrypt = require('bcrypt');

// DEFINE SALT-ROUND
const saltRound = 10;

// HASH PASSWORD
const hashPassword = async (password) => {

	// HASH PASSWORD
	const hashedPassword = await bcrypt.hash(password, saltRound);

	// RETURN PASSWORD
	return hashedPassword;

};

// COMPARE PASSWORD
const comparePassword = async (password, hash) => {

	// COMPARE PASSWORD
	const comparedPassword = await bcrypt.compare(password, hash);

	// RETURN PASSWORD
	return comparedPassword;

};

// EXPORTS
module.exports = {
	hashPassword,
	comparePassword,
};
