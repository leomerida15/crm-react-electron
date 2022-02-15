const validToken = require('../config/token');

const Router = async (rout, func, data) => {
	const token = validToken(data);
	data.header = token;
	return `../functions/${rout}`;
	// return await require(`../functions/${rout}`)[func](data);
};

module.exports = Router;
