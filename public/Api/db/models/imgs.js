const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
	name: 'Imgs',
	columns: {
		id: { primary: true, type: 'int', generated: true },
		path: { type: 'varchar', unique: true },
	},
	relations: {
		Clients: {
			target: 'Clients',
			type: 'one-to-many',
			joinColumn: true,
			cascade: true,
		},
	},
});
