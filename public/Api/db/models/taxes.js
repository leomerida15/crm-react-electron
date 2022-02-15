const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
	name: 'Taxes',
	columns: {
		id: { primary: true, type: 'int', generated: true },
		id_user: { type: 'int' },
		id_client: { type: 'int' },
	},
	relations: {
		Users: {
			target: 'Users',
			type: 'many-to-one',
			joinColumn: { name: 'id_user' },
		},
		Clients: {
			target: 'Clients',
			type: 'many-to-one',
			joinColumn: { name: 'id_client' },
		},
	},
});
