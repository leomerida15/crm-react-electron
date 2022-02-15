/* eslint-disable no-throw-literal */
const { Users, Imgs } = require("../db");
const bcrypt = require("bcrypt");
const valid = require("validator");
const { saveFile } = require("./Upload");
// const { Op } = require('sequelize');
const JWT = require("../hooks/token");
const { getRepository } = require("typeorm");

const Auth = {};

Auth.register = async (data) => {
  try {
    console.log("data", data);

    // return data;
    if (!data) throw { message: "la data es requerida" };

    const { email, image } = data.body;

    if (!valid.isEmail(email)) throw { message: "El email no es valido" };

    //
    if (
      !valid.isStrongPassword(data.body.password, {
        minLength: 6,
        minNumbers: 1,
        minLowercase: 1,
      })
    ) {
      throw { message: "El password no es valido" };
    }

    // ecript password with bcrypt
    const salt = bcrypt.genSaltSync(10);
    data.body.password = bcrypt.hashSync(data.body.password, salt);

    const { password } = data.body;

    const id_img = await saveFile(image);

    const info = await getRepository("Users").save({
      password,
      email,
      id_img,
    });

    console.log("");
    console.log("info", info);
    console.log("");

    // return data;

    return { message: "registro ok", info, status: true };
  } catch (err) {
    console.log("err", err);
    return { err, status: false };
  }
};

Auth.login = async (data) => {
  try {
    if (!data) throw { message: "la data es requerida" };
    // define data
    const { email, password } = data.body;

    // query SELECT
    const user = await Users.findOne({ where: { email } });
    if (!user) throw { message: `Usuario no Registrado` };

    // valid password with bcryt
    const valid_password = await bcrypt.compare(password, user.password);
    if (!valid_password) throw { message: `El password no coinside` };

    // token
    console.log({ id_user: user.id, email: user.email });
    const token = JWT.create({ id_user: user.id, email: user.email });

    return { message: "usuario logeado", token, status: true };
  } catch (err) {
    return { err, status: false };
  }
};

Auth.getUser = async (data) => {
  try {
    if (!data) throw { message: "la data es requerida" };
    // define data
    const { email } = JWT.valid(data.headers.token);

    // query SELECT
    const info = await Users.findOne({
      where: { email },
      include: [{ model: Imgs }],
    });

    if (!info) throw { message: `Usuario no Registrado` };

    return { message: "usuario logeado", status: true };
  } catch (err) {
    return { err, status: false };
  }
};

module.exports = Auth;
