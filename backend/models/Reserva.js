const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Reserva = sequelize.define("Reserva", {
  servicio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  especialidad: {
    type: DataTypes.STRING,
  },
  fecha: {
    type: DataTypes.STRING,
  },
  hora: {
    type: DataTypes.STRING,
  },
  clienteId: {
    type: DataTypes.INTEGER,
  },
  precio: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Reserva;
