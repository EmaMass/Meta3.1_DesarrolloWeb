module.exports = {
  development: {
    username: "backenduser",
    password: "superpassword",
    database: "cineBase",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  test: {
    username: "backenduser",
    password: "superpassword",
    database: "cineBase_test",
    host: "localhost",
    dialect: "mysql"
  },
  production: {
    username: "backenduser",
    password: "superpassword",
    database: "cineBase_prod",
    host: "localhost",
    dialect: "mysql"
  }
};
