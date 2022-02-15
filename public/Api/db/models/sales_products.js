module.exports = (sequelize, type) => {
	const { INTEGER, STRING } = type;

	const sales_products = sequelize.define(
		'sales_products',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			id_sale: { type: INTEGER },
			id_public: { type: STRING(45) },
		},
		{ freezeTableName: true, timestamps: false },
	);

	return sales_products;
};
