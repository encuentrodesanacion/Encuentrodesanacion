// backend/server.js

// 1. Cargar variables de entorno al inicio y depurar su carga
const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
  console.error("Error al cargar .env:", result.error);
} else {
  console.log(".env cargado correctamente. Variables cargadas:", result.parsed);
}

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// --- Importaciones de Modelos de Base de Datos ---
// Asegúrate de que estos paths sean correctos según la ubicación de tus archivos.
const db = require("./models"); // Asumo que este archivo inicializa Sequelize y los modelos
const Terapeuta = require("./models/Terapeuta"); // Asumo que estos modelos se usan en otros controladores
const Reserva = require("./models/Reserva");
const TemporalReserva = require("./models/TemporalReserva"); // Importa TemporalReserva también

// --- Importaciones de Rutas ---
// ¡Importa el archivo de rutas de Webpay!
const webpayRoutes = require("./routes/webpay.routes");

// Si tienes otras rutas como las de Google Auth, impórtalas aquí:
// **IMPORTANTE:** Revisa la ruta de googleAuth.
const googleAuthRoutes = require("./models/Routes/googleAuth"); // Asumo que esta ruta es correcta

// --- Middlewares Globales ---

// Configuración de CORS: Permite a tu frontend (localhost:5173) hacer peticiones al backend.
app.use(
  cors({
    origin: ["http://localhost:5173"], // O el dominio de tu frontend en producción
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ¡CRUCIAL! Middlewares para parsear el cuerpo de las solicitudes JSON y URL-encoded.
// Deben ir ANTES de cualquier ruta que necesite leer req.body (como las de Webpay).
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Rutas de la API ---

// Montar el router de Webpay bajo el prefijo /api/webpay.
// Esto hará que:
// POST /api/webpay                 -> webpayRoutes.post('/')
// POST /api/webpay/confirmacion    -> webpayRoutes.post('/confirmacion')
app.use("/api/webpay", webpayRoutes);

// Montar otras rutas (ej. Google Auth)
app.use("/", googleAuthRoutes); // Revisa si esta ruta base es la adecuada para googleAuth

// Ruta para recibir reserva desde frontend (ejemplo, si no la manejas con un controlador)
app.post("/api/enviar-reserva", (req, res) => {
  console.log("Reserva recibida:", req.body);
  res.status(200).send("Reserva recibida correctamente");
});

// Crear reserva autenticada (ejemplo de ruta directa)
app.post("/api/reservar", async (req, res) => {
  try {
    const { fechaInicio, fechaFin, usuarioId, servicio } = req.body;

    const reservaExistente = await Reserva.findOne({
      where: { fechaInicio, fechaFin, estado: "reservado" },
    });

    if (reservaExistente) {
      return res
        .status(400)
        .json({ mensaje: "Ese horario ya está reservado." });
    }

    await Reserva.create({
      usuarioId,
      servicio,
      fechaInicio,
      fechaFin,
      estado: "reservado",
    });

    res.status(200).json({ mensaje: "Reserva creada y hora bloqueada" });
  } catch (error) {
    console.error("Error creando reserva:", error);
    res
      .status(500)
      .json({ mensaje: "Error al crear la reserva", error: error.message });
  }
});

// Obtener terapeutas
app.get("/api/terapeutas", async (req, res) => {
  try {
    const terapeutas = await Terapeuta.findAll();
    res.json(terapeutas);
  } catch (error) {
    console.error("Error al obtener los terapeutas:", error);
    res.status(500).json({ error: "Error al obtener los terapeutas" });
  }
});

// Obtener reservas
app.get("/api/reservas", async (req, res) => {
  try {
    const reservas = await Reserva.findAll();
    res.json(reservas);
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    res.status(500).json({ error: "Error al obtener las reservas" });
  }
});

// Crear terapeuta
app.post("/api/terapeutas", async (req, res) => {
  const { nombre, email, servicio } = req.body;
  try {
    const nuevo = await Terapeuta.create({ nombre, email, servicio });
    res.status(201).json(nuevo);
  } catch (err) {
    console.error("Error al agregar terapeuta:", err);
    res.status(500).send("Error al guardar terapeuta");
  }
});

// --- Sincronizar base de datos e iniciar servidor ---
// Usa db.sequelize.sync({ alter: true }) para actualizar la DB sin borrar datos.
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Base de datos actualizada correctamente");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Servidor escuchando en puerto ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Error al sincronizar la base de datos:", err);
  });
