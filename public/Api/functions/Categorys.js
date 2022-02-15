/* eslint-disable no-throw-literal */
const { Categorys } = require('../db');
const JWT = require('../hooks/token');
const Notes = require('./Notes');
// const { Op } = require('sequelize');

const category = {};

category.ALL = async (data) => {
	try {
		const { email } = JWT.valid(data.headers.token);

		const info = await Categorys.findAll({ order: [['id', 'ASC']] });

		Notes.CREATE({ note: `todas las categorias solicitadas por ${email}`, origin: 'categorys.ALL' });
		return { message: 'todas las categorias', info, status: true };
	} catch (err) {
		return { err, status: false };
	}
};

category.CREATE = async (data) => {
	try {
		console.log('token', data.headers.token);
		const { id_user, email } = JWT.valid(data.headers.token);
		console.log({ id_user, email });
		const { name } = data.body;

		const info = await Categorys.create({ id_user, name });

		Notes.CREATE({ note: `categoria creada por ${email}`, origin: 'categorys.CREATE' });
		return { message: 'categoria creada', info, status: true };
	} catch (err) {
		return { err, status: false };
	}
};

category.EDIT = async (data) => {
	try {
		const { email } = JWT.valid(data.headers.token);
		const { name, id } = data.body;

		await Categorys.update({ name }, { where: { id } });
		const info = await Categorys.findAll({ order: [['id', 'ASC']] });

		Notes.CREATE({ note: `categoria editada por ${email}`, origin: 'categorys.EDIT' });
		return { message: 'categoria editada', info, status: true };
	} catch (err) {
		return { err, status: false };
	}
};

category.DELETE = async (data) => {
	try {
		const { email } = JWT.valid(data.headers.token);
		const { id } = data.body;

		const info = await Categorys.destroy({ where: { id } });

		Notes.CREATE({ note: `categoria eliminada por ${email}`, origin: 'categorys.DELETE' });
		return { message: 'categoria eliminada', info, status: true };
	} catch (err) {
		return { err, status: false };
	}
};

module.exports = category;
