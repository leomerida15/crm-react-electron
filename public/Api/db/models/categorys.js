const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
	name: 'Categorys',
	columns: {
		id: { primary: true, type: 'int', generated: true },
		id_user: { type: 'int' },
		name: { type: 'varchar' },
	},
	relations: {
		Users: {
			target: 'Users',
			type: 'many-to-one',
			joinColumn: { name: 'id_user' },
		},
		products: {
			target: 'Products',
			type: 'one-to-many',
			joinColumn: true,
			cascade: true,
		},
	},
});
