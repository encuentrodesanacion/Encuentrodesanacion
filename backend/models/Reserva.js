// backend/models/Reserva.js

module.exports = (sequelize, DataTypes) => {
  const Reserva = sequelize.define(
    "Reserva",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      servicio: {
        type: DataTypes.STRING,
        allowNull: false, // <-- ¡ASEGURADO: NO PUEDE SER NULO!
      },
      especialidad: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sesiones: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      hora: {
        type: DataTypes.STRING, // O DataTypes.TIME si usas formato de tiempo
        allowNull: true,
      },
      fecha: {
        type: DataTypes.DATEONLY, // Solo la fecha (YYYY-MM-DD)
        allowNull: true,
      },
      precio: {
        type: DataTypes.DECIMAL(10, 2), // Para precios con 2 decimales
        allowNull: false, // <-- ¡ASEGURADO: NO PUEDE SER NULO!
      },
      usuarioId: {
        // Si tienes un modelo de Usuario
        type: DataTypes.INTEGER,
        allowNull: true, // O false si es obligatorio
        // references: {
        //   model: 'Usuarios', // Asegúrate que el nombre del modelo sea correcto
        //   key: 'id',
        // },
      },
      tokenTransaccion: {
        // Para guardar el token de Webpay
        type: DataTypes.STRING,
        allowNull: true,
      },
      estado: {
        type: DataTypes.STRING,
        defaultValue: "pendiente", // 'pendiente', 'confirmada', 'cancelada', etc.
      },
      // Si usas Google Calendar
      googleEventId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "Reservas", // Nombre de la tabla en la DB
      timestamps: true, // Añade createdAt y updatedAt
      underscored: true, // Para created_at, updated_at
    }
  );

  return Reserva;
};
