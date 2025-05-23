import React, { useState } from "react";

export default function PagoWebpay() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Datos de ejemplo para la transacción
  const amount = 10000; // monto en pesos chilenos
  const buyOrder = `order-${Date.now()}`;
  const sessionId = `session-${Date.now()}`;
  const returnUrl = "http://localhost:5173/pago-confirmacion"; // página que recibe token_ws

  // Aquí podrían venir datos reales del carrito o reserva que quieras pagar
  const reservaInfo = {
    usuarioId: 1,
    servicio: "Reiki",
    fechaInicio: "2025-06-01T15:00:00",
    fechaFin: "2025-06-01T16:00:00",
  };

  const crearTransaccion = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/api/crear-transaccion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, buyOrder, sessionId, returnUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al crear la transacción");
        setLoading(false);
        return;
      }

      // Webpay espera que enviemos el token_ws a la URL que nos da, via POST form
      // Creamos un form dinámico para enviar el token y redirigir al TPV Webpay

      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.url;

      const inputToken = document.createElement("input");
      inputToken.type = "hidden";
      inputToken.name = "token_ws";
      inputToken.value = data.token;

      form.appendChild(inputToken);
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setError("Error en la conexión con el servidor");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Pagar con Webpay Plus</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={crearTransaccion} disabled={loading}>
        {loading ? "Creando transacción..." : `Pagar $${amount}`}
      </button>
    </div>
  );
}
