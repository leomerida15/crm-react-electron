const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
	name: 'Sales',
	columns: {
		id: { primary: true, type: 'int', generated: true },
		id_client: { type: 'varchar' },
		id_user: { type: 'varchar' },
		id_produc: { type: 'int' },
		taxes: { type: 'varchar' },
		net: { type: 'varchar' },
		id_pay_method: { type: 'date' },
		dollar_day: { type: 'float' },
	},
	relations: {
		Clients: {
			target: 'Clients',
			type: 'many-to-one',
			joinColumn: { name: 'id_client' },
		},
		Users: {
			target: 'Users',
			type: 'many-to-one',
			joinColumn: { name: 'id_user' },
		},
		Products: {
			target: 'Products',
			type: 'many-to-one',
			joinColumn: { name: 'id_produc' },
		},
	},
});
