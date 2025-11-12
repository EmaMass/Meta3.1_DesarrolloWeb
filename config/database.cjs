const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cineBase", "backenduser", "superpassword", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
