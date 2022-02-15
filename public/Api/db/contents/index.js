const rols = require('./models/rols');

const init = async (model) => {
	try {
		await rols(model);
	} catch (err) {
		console.log(err);
	}
};

module.exports = init;
