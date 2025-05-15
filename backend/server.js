const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// ✅ 1. Middleware CORS al inicio, sin credentials si no usas cookies
app.use(
  cors({
    origin: "http://localhost:5173", // origen principal de tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ 2. Middleware para JSON
app.use(bodyParser.json());

// ✅ 3. Importar modelos y conexión a DB
const sequelize = require("./sequelize");
const Terapeuta = require("./models/Terapeuta");
const Reserva = require("./models/Reserva");

// ✅ 4. Configurar Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tu_correo@gmail.com", // reemplaza con tu correo real
    pass: "tu_contraseña", // usa contraseña de aplicación
  },
});

// ✅ 5. Ruta para enviar reserva y correo
app.post("/api/enviar-reserva", async (req, res) => {
  const reserva = req.body;

  if (!reserva || !reserva.servicio || !reserva.especialidad) {
    return res.status(400).send("Datos incompletos en la reserva.");
  }

  try {
    const terapeuta = await Terapeuta.findOne({
      where: { nombre: reserva.especialidad },
    });

    if (!terapeuta) {
      return res.status(404).send("No se encontró terapeuta con ese nombre.");
    }

    const mailOptions = {
      from: "tu_correo@gmail.com",
      to: terapeuta.email,
      subject: `Nueva reserva para ${reserva.servicio}`,
      text: `
Hola ${terapeuta.nombre},

Tienes una nueva reserva:

- Servicio: ${reserva.servicio}
- Especialidad: ${reserva.especialidad}
- Fecha: ${reserva.fecha || "Por confirmar"}
- Hora: ${reserva.hora || "Por confirmar"}
- Cliente ID: ${reserva.clienteId || "No definido"}
- Precio: $${reserva.precio || "No definido"}

¡Prepárate para recibir a tu paciente!
      `,
    };

    // Guardar en la base de datos
    await Reserva.create(reserva);

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
        return res.status(500).send("No se pudo enviar el correo.");
      }

      console.log("Correo enviado:", info.response);
      res.status(200).send("Reserva procesada y notificación enviada.");
    });
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).send("Error del servidor.");
  }
});

// ✅ 6. Insertar terapeutas base (solo una vez)
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

// ✅ 7. Rutas REST API
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

// ✅ 8. Iniciar servidor
sequelize.sync().then(() => {
  console.log("Base de datos sincronizada");
  app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
  });
});
