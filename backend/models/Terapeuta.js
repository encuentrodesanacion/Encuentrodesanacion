const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Terapeuta = sequelize.define("Terapeuta", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  servicio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Terapeuta;
