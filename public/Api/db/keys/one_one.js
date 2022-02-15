module.exports = (model) => {
	const { Imgs, Users, Imgs_Products } = model;
	// usuarios at Roles_has_usuarios
	Users.hasOne(Imgs, { foreignKey: 'id_img' });
	Imgs.belongsTo(Users, { foreignKey: 'id_img' });
	//
	Imgs.hasOne(Imgs_Products, { foreignKey: 'id_img' });
	Imgs_Products.belongsTo(Imgs_Products, { foreignKey: 'id_img' });
};
