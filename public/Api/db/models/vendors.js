const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
	name: 'Vendors',
	columns: {
		id: { primary: true, type: 'int', generated: true },
		name: { type: 'int' },
		rif: { type: 'varchar' },
		email: { type: 'varchar' },
		phone: { type: 'varchar' },
		direction: { type: 'varchar' },
	},
});
