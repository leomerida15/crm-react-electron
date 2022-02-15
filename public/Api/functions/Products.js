/* eslint-disable no-throw-literal */
const { Products, Categorys, Vendors } = require('../db');
const JWT = require('../hooks/token');
const Notes = require('./Notes');
// const { Op } = require('sequelize');

const product = {};

product.ALL = async (data) => {
	try {
		const { email } = JWT.valid(data.headers.token);

		const resp = await Products.findAll({
			order: [['id', 'ASC']],
			include: [{ model: Categorys }, { model: Vendors }],
		});

		const info = resp.map(({ dataValues }) => {
			const { id, name, description, price, category, stock, vendor } = dataValues;

			return { id, name, description, price, category: category.name, vendor: vendor.name, stock };
		});

		Notes.CREATE({ note: `todos los productos solicitadas por ${email}`, origin: 'Products.ALL' });
		return { message: 'todos los productos', info, status: true };
	} catch (err) {
		console.clear();
		console.log('err', err);
		return { err, status: false };
	}
};

product.CREATE = async (data) => {
	try {
		console.log('token', data.headers.token);
		const { id_user, email } = JWT.valid(data.headers.token);
		console.log({ id_user, email });

		console.log(data.body);

		const info = await Products.create(data.body);

		Notes.CREATE({ note: `producto creado por ${email}`, origin: 'Products.CREATE' });
		return { message: 'producto creado', info, status: true };
	} catch (err) {
		console.log('err', err);
		return { err, status: false };
	}
};

product.EDIT = async (data) => {
	try {
		const { email } = JWT.valid(data.headers.token);
		const { name, id } = data.body;

		await Products.update({ name }, { where: { id } });
		const info = await Products.findAll({ order: [['id', 'ASC']] });

		Notes.CREATE({ note: `producto editado por ${email}`, origin: 'Products.EDIT' });
		return { message: 'producto editado', info, status: true };
	} catch (err) {
		return { err, status: false };
	}
};

product.DELETE = async (data) => {
	try {
		const { email } = JWT.valid(data.headers.token);
		const { id } = data.body;

		const info = await Products.destroy({ where: { id } });

		Notes.CREATE({ note: `producto elominado por ${email}`, origin: 'Products.DELETE' });
		return { message: 'producto elominado', info, status: true };
	} catch (err) {
		return { err, status: false };
	}
};

module.exports = product;
