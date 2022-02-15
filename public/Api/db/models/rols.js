const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Rols",
  columns: {
    id: { primary: true, type: "int", generated: true },
    name: { type: "varchar" },
    description: { type: "varchar", nullable: true },
  },
  relations: {
    Clients: {
      target: "Clients",
      type: "one-to-many",
      joinColumn: true,
      cascade: true,
    },
  },
});
