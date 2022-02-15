const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
	name: 'Historys',
	columns: {
		id: { primary: true, type: 'int', generated: true },
		//
		id_client: { type: 'int' },
		id_user: { type: 'int' },
		//
		esferea_oi: { type: 'varchar' },
		esferea_od: { type: 'varchar' },
		//
		eje_oi: { type: 'varchar' },
		eje_od: { type: 'varchar' },
		//
		cilindro_oi: { type: 'varchar' },
		cilindro_od: { type: 'varchar' },
		//
		add_oi: { type: 'varchar' },
		add_od: { type: 'varchar' },
		//
		dp_oi: { type: 'varchar' },
		dp_od: { type: 'varchar' },
	},
	relations: {
		Clients: {
			target: 'Clients',
			type: 'many-to-one',
			joinColumn: { name: 'id_client' },
			cascade: true,
		},
	},
});
