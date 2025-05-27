const express = require("express");
const router = express.Router();
const { WebpayPlus, Options, Environment } = require("transbank-sdk");
const Reserva = require("../models/Reserva");
const TemporalReserva = require("../models/TemporalReserva");
const { google } = require("googleapis");
const path = require("path");
const confirmarTransaccionController = require("../controllers/confirmar-transaccion");
// Instanciar Webpay
const transaction = new WebpayPlus.Transaction(
  new Options(
    process.env.TBK_COMMERCE_CODE,
    process.env.TBK_API_KEY_ID || "default",
    process.env.TBK_API_KEY,
    Environment.Integration
  )
);

// Autenticación con Google
async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(
      __dirname,
      "eastern-adapter-460517-n2-92b808b48f6c.json"
    ),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return await auth.getClient();
}

// Crear evento en Google Calendar
async function crearEventoReserva(fechaInicioISO, fechaFinISO, resumen) {
  const authClient = await authorize();
  const calendar = google.calendar("v3");

  const evento = {
    summary: resumen,
    start: { dateTime: fechaInicioISO },
    end: { dateTime: fechaFinISO },
  };

  const respuesta = await calendar.events.insert({
    auth: authClient,
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    requestBody: evento,
  });

  return respuesta.data;
}

// Ruta para confirmar transacción
router.post("/webpay-confirmacion", async (req, res) => {
  const { token, reservaInfo } = req.body;

  if (!token) return res.status(400).json({ mensaje: "Falta token" });

  try {
    const respuesta = await transaction.commit(token);

    if (respuesta.status === "AUTHORIZED") {
      // Busca reservas temporales
      const temporal = await TemporalReserva.findOne({ where: { token } });

      if (temporal) {
        for (const reserva of temporal.reservas) {
          await Reserva.create({
            ...reserva,
            tokenTransaccion: token,
            estado: "confirmada",
          });

          // Aquí podrías agregar notificación a terapeutas si tienes una función enviarNotificacion
          // await enviarNotificacion(reserva);
        }

        await TemporalReserva.destroy({ where: { token } });
      }

      // Crear evento en Calendar si hay info
      let evento = null;
      if (reservaInfo) {
        evento = await crearEventoReserva(
          reservaInfo.fechaInicio,
          reservaInfo.fechaFin,
          `Reserva de ${reservaInfo.servicio}`
        );
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

module.exports = router;
