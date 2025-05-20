import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";

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

export default Terapeuta;
