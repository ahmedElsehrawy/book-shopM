const { Client } = require("pg");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("shop", "postgres", "0321974", {
  host: "localhost",
  dialect: "postgres",
});

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "shop",
  password: "0321974",
  port: 5432,
});

exports.createSchema = async () => {
  await client.query(
    "create table product (id serial primary key unique , title Text NOT NULL, imageUrl Text NOT NULL,description Text NOT NULL,price Double Precision NOT NULL)"
  );
};

exports.sequelize = sequelize;

exports.client = client;
