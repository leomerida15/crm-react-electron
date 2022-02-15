const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Users",
  columns: {
    id: { primary: true, type: "int", generated: true },
    email: { type: "varchar", unique: true },
    password: { type: "varchar" },
    id_img: { type: "int", nullable: true },
    id_rol: { type: "int", default: 2 },
    active: { type: "boolean", default: true },
  },
  relations: {
    Rols: {
      target: "Rols",
      type: "many-to-one",
      joinColumn: { name: "id_rol" },
      cascade: true,
    },
    imgs: {
      target: "Imgs",
      type: "one-to-one",
      joinColumn: { name: "id_img" },
      cascade: true,
    },
    categorys: {
      target: "Categorys",
      type: "one-to-many",
      joinColumn: true,
    },
    products: {
      target: "Products",
      type: "one-to-many",
      joinColumn: true,
    },
  },
});
