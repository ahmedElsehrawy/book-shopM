const { Client } = require("pg");

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

const ahmed = "hello";

exports.client = client;
