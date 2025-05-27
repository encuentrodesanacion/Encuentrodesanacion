// backend/controllers/webpayController.js

const { WebpayPlus, Options, Environment } = require("transbank-sdk");
const { google } = require("googleapis");
const path = require("path");

// --- Importa los modelos directamente desde el objeto 'db' ---
const db = require("../models");
const Reserva = db.Reserva;
const TemporalReserva = db.TemporalReserva;

// Log para verificar qué valores se están usando (¡remover en producción!)
console.log("------------------------------------------");
console.log("Cargando configuración de Transbank en Controller:");
console.log("process.env.TBK_COMMERCE_CODE:", process.env.TBK_COMMERCE_CODE);
console.log("process.env.TBK_API_KEY:", process.env.TBK_API_KEY);
console.log("process.env.TBK_ENV:", process.env.TBK_ENV);
console.log("------------------------------------------");

// Instanciar Webpay
const transaction = new WebpayPlus.Transaction(
  new Options(
    process.env.TBK_COMMERCE_CODE,
    process.env.TBK_API_KEY,
    process.env.TBK_ENV === "PRODUCCION"
      ? Environment.Production
      : Environment.Integration
  )
);

// --- Funciones auxiliares para Google Calendar ---
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

// Controlador para INICIAR una transacción de Webpay
const crearTransaccionInicial = async (req, res) => {
  try {
    const { monto, returnUrl, reservas } = req.body;

    if (!monto || !returnUrl || !reservas || reservas.length === 0) {
      return res.status(400).json({
        error:
          "Faltan parámetros: monto, returnUrl o reservas no contiene ítems.",
      });
    }

    // Validación defensiva para cada reserva en el carrito ANTES de guardar temporalmente
    for (const resItem of reservas) {
      if (
        typeof resItem.servicio !== "string" ||
        resItem.servicio.trim() === ""
      ) {
        console.error(
          "Error de validación: Reserva en carrito sin servicio válido.",
          resItem
        );
        return res.status(400).json({
          error:
            "Reserva en carrito contiene un servicio inválido (vacío o no string).",
        });
      }
      if (
        typeof resItem.precio !== "number" ||
        isNaN(resItem.precio) ||
        resItem.precio === null ||
        resItem.precio <= 0
      ) {
        console.error(
          "Error de validación: Reserva en carrito con precio inválido.",
          resItem
        );
        return res.status(400).json({
          error:
            "Reserva en carrito contiene un precio inválido (no número, nulo o <= 0).",
        });
      }
      // Puedes añadir validaciones para otros campos obligatorios aquí (ej. nombre, correo)
      // if (!resItem.nombre || resItem.nombre.trim() === '') { ... }
    }

    const buyOrder = `orden_compra_${Date.now()}`;
    const sessionId = `sesion_${Date.now()}`;

    const response = await transaction.create(
      buyOrder,
      sessionId,
      monto,
      returnUrl
    );

    // Guarda las reservas temporalmente antes de la confirmación
    await TemporalReserva.create({
      token: response.token,
      reservas: reservas, // Guarda el array completo de reservas
    });

    res.json({
      url: response.url,
      token: response.token,
    });
  } catch (error) {
    console.error("Error al crear transacción inicial Webpay:", error);
    if (error.constructor && error.constructor.name === "TransbankError") {
      console.error("Detalles del error de Transbank:", error.message);
      res.status(500).json({
        mensaje: "Error de configuración o credenciales con Transbank.",
        error: error.message,
      });
    } else {
      res.status(500).json({
        mensaje: "Error interno del servidor al iniciar la transacción.",
        error: error.message,
      });
    }
  }
};

// Controlador para CONFIRMAR una transacción de Webpay
const confirmarTransaccion = async (req, res) => {
  // Webpay puede enviar el token por POST (en el body) o por GET (en el query params)
  const token = req.query.token_ws || req.body?.token_ws; // Prioriza query, luego body de forma segura

  // --- CONSOLE.LOGS DEPURACIÓN (Mantenidos) ---
  console.log("------------------------------------------");
  console.log("Entrando a confirmarTransaccion");
  console.log("req.method:", req.method);
  console.log("req.body:", req.body);
  console.log("req.query:", req.query);
  console.log("Token obtenido:", token);
  console.log("------------------------------------------");
  // --- FIN DE CONSOLE.LOGS DEPURACIÓN ---

  if (!token) {
    console.warn("Falta token de confirmación en req.body o req.query.");
    return res.status(400).send(`
      <html><body>
        <h1>Error: Falta token de confirmación.</h1>
        <script>
          window.location.href = '${process.env.FRONTEND_URL}/pago-fallido?error=missing_token';
        </script>
      </body></html>
    `);
  }

  try {
    const commitResponse = await transaction.commit(token);

    if (commitResponse.status === "AUTHORIZED") {
      const temporal = await TemporalReserva.findOne({ where: { token } });

      if (temporal && temporal.reservas) {
        // Se quita temporal.reservas.length > 0 porque puede ser string vacío
        // --- CONSOLE.LOG CRUCIAL (RAW) ---
        console.log(
          "Reservas recuperadas de TemporalReserva (RAW):",
          temporal.reservas
        );
        console.log(
          "Tipo de temporal.reservas (RAW):",
          typeof temporal.reservas
        );
        // --- FIN CONSOLE.LOG ---

        let reservasToProcess = temporal.reservas;

        // --- ¡AÑADE ESTA LÍNEA CRUCIAL PARA PARSEAR EL JSON SI ES UNA CADENA! ---
        if (typeof reservasToProcess === "string") {
          try {
            reservasToProcess = JSON.parse(reservasToProcess);
            console.log(
              "Reservas parseadas de JSON String:",
              reservasToProcess
            );
          } catch (parseError) {
            console.error(
              "Error al parsear JSON de temporal.reservas:",
              parseError
            );
            throw new Error(
              "Error interno: Falló la lectura de datos de reserva temporal."
            );
          }
        }
        // --- FIN LÍNEA CRUCIAL ---

        // Asegúrate de que ahora sea un array y tenga elementos
        if (
          !Array.isArray(reservasToProcess) ||
          reservasToProcess.length === 0
        ) {
          console.warn(
            "TemporalReserva encontrada pero 'reservas' no es un array o está vacío después de parsear:",
            reservasToProcess
          );
          throw new Error("No se encontraron reservas válidas para confirmar.");
        }

        for (const reserva of reservasToProcess) {
          // <-- ¡Ahora itera sobre reservasToProcess!
          // --- VALIDACIÓN DEPURACIÓN FINAL ---
          let errorMessages = [];

          // Depuración y validación de 'servicio'
          if (typeof reserva.servicio !== "string") {
            errorMessages.push(
              `'servicio' no es un string (tipo: ${typeof reserva.servicio}).`
            );
          } else if (reserva.servicio.trim() === "") {
            errorMessages.push(
              `'servicio' es una cadena vacía o solo espacios (valor: '${reserva.servicio}').`
            );
          } else {
            console.log(
              `DEBUG: Servicio: '${reserva.servicio}' (longitud: ${reserva.servicio.length})`
            );
            console.log(
              `DEBUG: Caracteres del servicio:`,
              Array.from(reserva.servicio).map((char) => char.charCodeAt(0))
            );
          }

          // Depuración y validación de 'precio'
          if (typeof reserva.precio !== "number") {
            errorMessages.push(
              `'precio' no es un número (tipo: ${typeof reserva.precio}).`
            );
          } else if (isNaN(reserva.precio)) {
            errorMessages.push(`'precio' es NaN.`);
          } else if (reserva.precio === null || reserva.precio <= 0) {
            // Check for null explicitely and less than or equal to 0
            errorMessages.push(
              `'precio' es nulo o menor/igual a cero (valor: ${reserva.precio}).`
            );
          } else {
            console.log(`DEBUG: Precio: ${reserva.precio}`);
          }

          if (errorMessages.length > 0) {
            console.error(
              "Error: Datos de reserva inválidos detectados. Detalles:",
              errorMessages,
              "Objeto:",
              reserva
            );
            throw new Error(
              "Datos de reserva inválidos: " + errorMessages.join(", ")
            );
          }
          // --- FIN VALIDACIÓN ---

          await Reserva.create({
            ...reserva, // Propiedades como servicio, precio, especialidad, fecha, hora, sesiones
            tokenTransaccion: token,
            estado: "confirmada", // Marca la reserva como confirmada
          });

          // Si hay datos de fecha/hora, crea el evento en Google Calendar
          // Solo intenta crear el evento si hay fecha y hora, y si el servicio es válido para calendarizar
          if (
            reserva.fecha &&
            reserva.hora &&
            reserva.servicio &&
            reserva.servicio.trim() !== ""
          ) {
            const fechaInicio = new Date(
              `${reserva.fecha}T${reserva.hora}:00`
            ).toISOString();
            const fechaFin = new Date(
              new Date(fechaInicio).getTime() + 60 * 60 * 1000
            ).toISOString(); // Asume 1 hora de duración

            try {
              await crearEventoReserva(
                fechaInicio,
                fechaFin,
                `Reserva: ${reserva.servicio} - ${
                  reserva.especialidad || "Sin especialidad"
                }`
              );
              console.log(
                "Evento de Google Calendar creado para:",
                reserva.servicio
              );
            } catch (googleError) {
              console.error(
                "Error al crear evento en Google Calendar (continúa el flujo de pago):",
                googleError instanceof Error
                  ? googleError.message
                  : String(googleError)
              );
            }
          } else {
            console.warn(
              "No se creó evento de Google Calendar: Faltan fecha/hora/servicio o servicio inválido para calendarizar.",
              reserva
            );
          }
        }
        await TemporalReserva.destroy({ where: { token } }); // Elimina las reservas temporales
      } else {
        console.warn(
          "TemporalReserva no encontrada o sin reservas para el token:",
          token
        );
        throw new Error(
          "No se encontraron reservas temporales para confirmar."
        );
      }

      // Redirige al usuario a la página de éxito en tu frontend
      res.status(200).send(`
        <html><body>
          <h1>¡Pago exitoso! Redirigiendo a tu página de confirmación...</h1>
          <script>
            window.location.href = '${process.env.FRONTEND_URL}/pago-confirmacion-exito?token=${token}';
          </script>
        </body></html>
      `);
    } else {
      console.warn("Pago no autorizado o fallido:", commitResponse);
      // Redirige a tu frontend con un mensaje de fallo
      res.status(400).send(`
        <html><body>
          <h1>Pago no autorizado o fallido.</h1>
          <script>
            window.location.href = '${
              process.env.FRONTEND_URL
            }/pago-fallido?token=${token}&status=${
        commitResponse.status
      }&code=${commitResponse.response_code || ""}';
          </script>
        </body></html>
      `);
    }
  } catch (error) {
    console.error("Error al confirmar transacción:", error);
    let errorMessage = "Error desconocido.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error
    ) {
      errorMessage = String(error.message);
    } else {
      errorMessage = String(error);
    }

    if (error.constructor && error.constructor.name === "TransbankError") {
      console.error("Detalles del error de Transbank:", errorMessage);
      res.status(500).send(`
        <html><body>
          <h1>Error de Transbank al confirmar.</h1>
          <script>
            window.location.href = '${
              process.env.FRONTEND_URL
            }/pago-fallido?token=${token || "n/a"}&error=${encodeURIComponent(
        errorMessage
      )}&type=transbank_error';
          </script>
        </body></html>
      `);
    } else if (error.name === "SequelizeValidationError") {
      console.error(
        "Detalles del error de validación de Sequelize:",
        error.errors.map((e) => e.message).join(", ")
      );
      res.status(500).send(`
            <html><body>
                <h1>Error al guardar la reserva (Validación de datos).</h1>
                <p>${error.errors.map((e) => e.message).join(", ")}</p>
                <script>
                    window.location.href = '${
                      process.env.FRONTEND_URL
                    }/pago-fallido?token=${
        token || "n/a"
      }&error=${encodeURIComponent(
        "Validación de datos: " + error.errors.map((e) => e.message).join(", ")
      )}&type=validation_error';
                </script>
            </body></html>
        `);
    } else {
      res.status(500).send(`
        <html><body>
          <h1>Error interno del servidor al confirmar el pago.</h1>
          <script>
            window.location.href = '${
              process.env.FRONTEND_URL
            }/pago-fallido?token=${token || "n/a"}&error=${encodeURIComponent(
        errorMessage
      )}&type=internal_server_error';
          </script>
        </body></html>
      `);
    }
  }
};

module.exports = {
  crearTransaccionInicial,
  confirmarTransaccion,
};
