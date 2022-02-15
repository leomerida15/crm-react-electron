const typeorm = require("typeorm");
const path = require("path");
const fs = require("fs");
const { getRepository } = require("typeorm");
const init = require("./contents");

const database = path.resolve("public/Api/db/sql/DB.sqlite");
const models = path.resolve("public/Api/db/models");

const entities = fs.readdirSync(models).map((file) => path.join(models, file));

module.exports = typeorm
  .createConnection({ type: "sqlite", database, synchronize: true, entities })
  .then((connection) => {
    init();
  })
  .catch((error) => console.log(error));
