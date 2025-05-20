import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

const Reserva = sequelize.define("Reserva", {
  servicio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: true, // explícito para aclarar que puede ser nulo
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
  precio: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default Reserva;
