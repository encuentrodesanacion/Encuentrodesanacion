// backend/models/Terapeuta.js

module.exports = (sequelize, DataTypes) => {
  const Terapeuta = sequelize.define(
    "Terapeuta",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      especialidad: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // Añade más campos si los necesitas para tu modelo Terapeuta
    },
    {
      tableName: "Terapeutas", // Nombre de la tabla en la DB
      timestamps: true, // Añade createdAt y updatedAt automáticamente
      underscored: true, // Usa snake_case para los nombres de columnas automáticos
    }
  );

  return Terapeuta;
};
