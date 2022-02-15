const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
	name: 'Products',
	columns: {
		id: { primary: true, type: 'int', generated: true },
		id_user: { type: 'int' },
		id_category: { type: 'int' },
		id_vendor: { type: 'int' },
		name: { type: 'varchar' },
		price: { type: 'int' },
		stock: { type: 'int' },
		description: { type: 'varchar' },
	},
	relations: {
		Users: {
			target: 'Users',
			type: 'many-to-one',
			joinColumn: { name: 'id_user' },
		},
		categorys: {
			target: 'Categorys',
			type: 'many-to-one',
			joinColumn: { name: 'id_category' },
			cascade: true,
		},
		// categories: {
		// 	target: 'Users',
		// 	type: 'many-to-one',
		// 	joinColumn: { name: 'id_user' },
		// 	cascade: true,
		// },
	},
});
