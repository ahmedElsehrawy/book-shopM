const { Client } = require("pg");

module.exports = new Client({
  user: "postgres",
  host: "localhost",
  database: "ecommerce",
  password: "0321974",
  port: 5432,
});
