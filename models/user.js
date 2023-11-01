const { Sequelize } = require("sequelize");
const { sequelize } = require("../database");

const string = Sequelize.STRING;
const integer = Sequelize.INTEGER;

const User = sequelize.define("user", {
  id: {
    type: integer,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: string,
    allowNull: false,
  },
  email: {
    type: string,
    allowNull: false,
  },
});

module.exports = User;
