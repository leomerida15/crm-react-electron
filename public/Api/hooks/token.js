const jwt = require('jsonwebtoken');
module.exports = {
	create: (obj) => jwt.sign(obj, 'secret'),
	valid: (token) => jwt.verify(token, 'secret'),
};
