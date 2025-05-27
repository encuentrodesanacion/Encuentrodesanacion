// backend/models/index.js

const { Sequelize, DataTypes } = require("sequelize"); // <-- Asegúrate de importar DataTypes aquí
const path = require("path");
const process = require("process");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: config.dialect,
      logging: false,
    }
  );
}

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize; // Sequelize (la clase)
db.DataTypes = DataTypes; // <-- ¡Añade DataTypes a db para fácil acceso!

// --- Importa y registra tus modelos aquí ---
// Pasa sequelize Y DataTypes a cada función de modelo
db.Terapeuta = require("./Terapeuta")(sequelize, DataTypes); // <-- ¡Modificado!
db.Reserva = require("./Reserva")(sequelize, DataTypes); // <-- ¡Modificado!
db.TemporalReserva = require("./TemporalReserva")(sequelize, DataTypes); // <-- ¡Modificado!

// ... (asociaciones si las hay) ...

module.exports = db;
