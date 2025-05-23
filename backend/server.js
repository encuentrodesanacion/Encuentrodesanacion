require("dotenv").config();
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const confirmarTransaccionRoute = require("./routes/webpay-confirmacion");
const cors = require("cors");
const { WebpayPlus, Environment, Options } = require("transbank-sdk");
const crearTransaccionRoute = require("./routes/crear-transaccion");
const sequelize = require("./sequelize");
const Terapeuta = require("./models/Terapeuta");
const Reserva = require("./models/Reserva");
const { autenticarToken } = require("./middlewares/auth");
const transbankRoutes = require("./models/Routes/webpay");
const googleAuthRoutes = require("./models/Routes/googleAuth");
const { google } = require("googleapis");
const path = require("path");

const calendar = google.calendar("v3");

// Función para autenticar con cuenta de servicio
async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(
      __dirname,
      "models",
      "Routes",
      "eastern-adapter-460517-n2-92b808b48f6c.json"
    ),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return await auth.getClient();
}

// Función para crear evento en Google Calendar
async function crearEventoReserva(fechaInicioISO, fechaFinISO, resumen) {
  const authClient = await authorize();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  const evento = {
    summary: resumen,
    start: { dateTime: fechaInicioISO },
    end: { dateTime: fechaFinISO },
  };

  const respuesta = await calendar.events.insert({
    auth: authClient,
    calendarId,
    requestBody: evento,
  });

  return respuesta.data;
}

const app = express();

// Middlewares globales
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS específico para frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Rutas
app.use("/api", transbankRoutes);
app.use("/api", require("./routes/enviarReserva"));
app.use("/", googleAuthRoutes);
app.use("/api/crear-transaccion", crearTransaccionRoute);
app.use("/api", confirmarTransaccionRoute);

// Confirmación de pago y creación de reserva
const transaction = new WebpayPlus.Transaction(
  new Options(
    process.env.TBK_COMMERCE_CODE,
    process.env.TBK_API_KEY_ID || "default",
    process.env.TBK_API_KEY,
    Environment.Integration
  )
);

app.post("/api/webpay-confirmacion", async (req, res) => {
  const { token, reservaInfo } = req.body;

  if (!token) return res.status(400).json({ mensaje: "Falta token" });

  try {
    const respuesta = await transaction.commit(token);

    if (respuesta.status === "AUTHORIZED") {
      let evento = null;
      if (reservaInfo) {
        evento = await crearEventoReserva(
          reservaInfo.fechaInicio,
          reservaInfo.fechaFin,
          `Reserva de ${reservaInfo.servicio}`
        );

        await Reserva.create({
          usuarioId: reservaInfo.usuarioId,
          servicio: reservaInfo.servicio,
          fechaInicio: reservaInfo.fechaInicio,
          fechaFin: reservaInfo.fechaFin,
          googleEventId: evento.id,
          estado: "reservado",
        });
      }

      return res.status(200).json({
        mensaje: "Pago exitoso y reserva creada",
        datosPago: respuesta,
        token_ws: token,
        evento,
      });
    } else {
      return res
        .status(400)
        .json({ mensaje: "Pago no autorizado", datosPago: respuesta });
    }
  } catch (error) {
    console.error("Error al confirmar transacción:", error);
    return res
      .status(500)
      .json({ mensaje: "Error al confirmar el pago", error: error.message });
  }
});

// Crear reserva manual (requiere autenticación)
app.post("/api/reservar", autenticarToken, async (req, res) => {
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

    const evento = await crearEventoReserva(
      fechaInicio,
      fechaFin,
      `Reserva de ${servicio}`
    );

    await Reserva.create({
      usuarioId,
      servicio,
      fechaInicio,
      fechaFin,
      googleEventId: evento.id,
      estado: "reservado",
    });

    res
      .status(200)
      .json({ mensaje: "Reserva creada y hora bloqueada", evento });
  } catch (error) {
    console.error("Error creando reserva:", error);
    res
      .status(500)
      .json({ mensaje: "Error al crear la reserva", error: error.message });
  }
});

// REST: Terapeutas y Reservas
app.get("/api/terapeutas", async (req, res) => {
  try {
    const terapeutas = await Terapeuta.findAll();
    res.json(terapeutas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los terapeutas" });
  }
});

app.get("/api/reservas", async (req, res) => {
  try {
    const reservas = await Reserva.findAll();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las reservas" });
  }
});

// Insertar terapeutas iniciales (solo una vez)
Terapeuta.bulkCreate(
  [
    {
      nombre: "Camila Sanación",
      email: "camila@example.com",
      servicio: "Reiki",
    },
    {
      nombre: "Juan Energía",
      email: "juan@example.com",
      servicio: "Sanación cuántica",
    },
    {
      nombre: "Lucía Luz",
      email: "lucia@example.com",
      servicio: "Terapia de luz",
    },
  ],
  { ignoreDuplicates: true }
)
  .then(() => console.log("Terapeutas insertados."))
  .catch(console.error);

// Crear nuevo terapeuta
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

// Sincronizar base de datos y lanzar servidor
sequelize.sync().then(() => {
  console.log("Base de datos actualizada correctamente");
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
  });
});
