/* eslint-disable no-throw-literal */
const { getRepository } = require("typeorm");
const { Rols } = require("../db");
const JWT = require("../hooks/token");
const Notes = require("./Notes");

const Rol = {};

Rol.ALL = async () => {
  try {
    const info = await getRepository("Rols").find();

    return { message: "todos los roles", info, status: true };
  } catch (err) {
    return { err, status: false };
  }
};

Rol.CREATE = async (data) => {
  try {
    console.log("token", data.headers.token);
    const { id_user, email } = JWT.valid(data.headers.token);
    console.log({ id_user, email });
    const { name } = data.body;

    const info = await Rols.create({ id_user, name });

    Notes.CREATE({
      note: `categoria creada por ${email}`,
      origin: "Rols.CREATE",
    });
    return { message: "categoria creada", info, status: true };
  } catch (err) {
    return { err, status: false };
  }
};

Rol.EDIT = async (data) => {
  try {
    const { email } = JWT.valid(data.headers.token);
    const { name, id } = data.body;

    await Rols.update({ name }, { where: { id } });
    const info = await Rols.findAll({ order: [["id", "ASC"]] });

    Notes.CREATE({
      note: `categoria editada por ${email}`,
      origin: "Rols.EDIT",
    });
    return { message: "categoria editada", info, status: true };
  } catch (err) {
    return { err, status: false };
  }
};

Rol.DELETE = async (data) => {
  try {
    const { email } = JWT.valid(data.headers.token);
    const { id } = data.body;

    const info = await Rols.destroy({ where: { id } });

    Notes.CREATE({
      note: `categoria eliminada por ${email}`,
      origin: "Rols.DELETE",
    });
    return { message: "categoria eliminada", info, status: true };
  } catch (err) {
    return { err, status: false };
  }
};

module.exports = Rol;
