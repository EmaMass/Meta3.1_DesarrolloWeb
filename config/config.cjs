module.exports = {
  development: {
    username: "backenduser",
    password: "superpassword",
    database: "cineBase",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
  },
  test: {
    username: "backenduser",
    password: "superpassword",
    database: "cineBase_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "backenduser",
    password: "superpassword",
    database: "cineBase_prod",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};
