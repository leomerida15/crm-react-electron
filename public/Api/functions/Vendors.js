/* eslint-disable no-throw-literal */
const { Vendors, Categorys } = require('../db');
const JWT = require('../hooks/token');
const Notes = require('./Notes');
// const { Op } = require('sequelize');

const Vendor = {};

Vendor.ALL = async (data) => {
	try {
		const { email } = JWT.valid(data.headers.token);

		const info = await Vendors.findAll({ order: [['id', 'ASC']] });

		Notes.CREATE({ note: `todos los Vendoros solicitadas por ${email}`, origin: 'Vendors.ALL' });
		return { message: 'todos los Vendoros', info, status: true };
	} catch (err) {
		console.clear();
		console.log('err', err);
		return { err, status: false };
	}
};

Vendor.CREATE = async (data) => {
	try {
		console.log('token', data.headers.token);
		const token = JWT.valid(data.headers.token);
		const { name, rif, email, phone, direction } = data.body;

		console.log({ name, rif, email, phone, direction });

		const info = await Vendors.create({ name, rif, email, phone, direction });

		Notes.CREATE({ note: `Vendoro creado por ${token.email}`, origin: 'Vendors.CREATE' });
		return { message: 'Proveedor creado', info, status: true };
	} catch (err) {
		console.log('err', err);
		return { err, status: false };
	}
};

Vendor.EDIT = async (data) => {
	try {
		const { email } = JWT.valid(data.headers.token);
		const { id, ...edit } = data.body;

		await Vendors.update({ ...edit }, { where: { id } });
		const info = await Vendors.findAll({ order: [['id', 'ASC']] });

		Notes.CREATE({ note: `Vendoro editado por ${email}`, origin: 'Vendors.EDIT' });
		return { message: 'Vendoro editado', info, status: true };
	} catch (err) {
		return { err, status: false };
	}
};

Vendor.DELETE = async (data) => {
	try {
		const { email } = JWT.valid(data.headers.token);
		const { id } = data.body;

		const info = await Vendors.destroy({ where: { id } });

		Notes.CREATE({ note: `Vendoro elominado por ${email}`, origin: 'Vendors.DELETE' });
		return { message: 'Vendoro elominado', info, status: true };
	} catch (err) {
		return { err, status: false };
	}
};

module.exports = Vendor;
