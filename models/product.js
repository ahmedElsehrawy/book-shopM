const { client } = require("../database");

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    await client.query(
      `INSERT INTO "public"."product" ( title, imageurl, description, price) VALUES ('${this.title}', '${this.imageUrl}', '${this.description}', ${this.price})`
    );
  }
};
