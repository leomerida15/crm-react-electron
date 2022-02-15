const jwt = require('jsonwebtoken');
const secret = 'secret';
const list = require('./list');
 
const validToken = (data) => {
	const { token } = data.headers;
	const { rout } = data.body;

	// valid jwt token
	if (token) {
		if (list.includes(rout)) return jwt.verify(token, secret);
	} else return true;

	return false;
};

module.exports = validToken;
