const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
	name: 'Clients',
	columns: {
		id: { primary: true, type: 'int', generated: true },
		email: { type: 'varchar', unique: true },
		name: { type: 'varchar' },
		last_name: { type: 'varchar' },
		document: { type: 'int' },
		phone: { type: 'varchar' },
		direction: { type: 'varchar' },
		date_birth: { type: 'date' },
		id_rol: { type: 'int' },
	},
	relations: {
		Rols: {
			target: 'Rols',
			type: 'many-to-one',
			joinColumn: { name: 'id_rol' },
			cascade: true,
		},
		Taxes: {
			target: 'Taxes',
			type: 'one-to-many',
			joinColumn: true,
		},
	},
});
