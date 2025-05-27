// models/TemporalReserva.js
module.exports = (sequelize, DataTypes) => {
  const TemporalReserva = sequelize.define("TemporalReserva", {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    reservas: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  });

  return TemporalReserva;
};
