const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Reserva = sequelize.define("Reserva", {
  servicio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fecha: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  hora: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  clienteNombre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  clienteEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  clienteTelefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  precio: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Reserva;
