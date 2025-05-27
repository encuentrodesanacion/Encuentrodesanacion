import React, { useState } from "react";
import { useCart, Reserva } from "../pages/CartContext";

// Define las props que este componente espera recibir de su padre
interface ReservaFormProps {
  servicio: string; // Ahora es obligatorio por el tipo Reserva
  terapeuta: string; // El nombre del terapeuta, que se usará como especialidad
  horasDisponibles?: string[]; // Opcional
}

const ReservaForm = ({
  servicio,
  terapeuta,
  horasDisponibles,
}: ReservaFormProps) => {
  const { addToCart } = useCart();

  // Estado local para los campos del formulario
  const [form, setForm] = useState({
    fecha: "",
    hora: "",
    precio: 30000, // Precio inicial fijo
  });

  // Manejador para actualizar el estado del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Manejador al enviar el formulario (agregar al carrito y enviar a la API)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Crea el objeto de la nueva reserva a partir del estado del formulario y las props
    const nuevaReserva: Reserva = {
      servicio: servicio, // Toma el valor de la prop 'servicio'
      especialidad: terapeuta, // Toma el valor de la prop 'terapeuta'
      fecha: form.fecha,
      hora: form.hora,
      precio: form.precio, // Toma el valor de 'precio' del estado local
    };

    // --- ¡AÑADE ESTE CONSOLE.LOG CRUCIAL PARA DEPURACIÓN! ---
    // Esto mostrará en la consola de tu navegador el objeto exacto que se intenta añadir.
    console.log("Objeto Reserva a añadir al carrito:", nuevaReserva);
    // --- FIN CONSOLE.LOG DEPURACIÓN ---

    // Llama a la función addToCart del contexto para agregar la reserva
    addToCart(nuevaReserva);
    alert("Reserva agregada al carrito");

    // Reinicia el formulario después de agregar la reserva
    setForm({
      fecha: "",
      hora: "",
      precio: 30000,
    });

    // Envía la reserva a tu API (esto es una notificación, no el pago)
    fetch("http://localhost:3000/api/enviar-reserva", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        servicio: nuevaReserva.servicio,
        especialidad: nuevaReserva.especialidad,
        fecha: nuevaReserva.fecha,
        hora: nuevaReserva.hora,
        precio: nuevaReserva.precio,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al enviar la reserva");
        }
        return res.text();
      })
      .then((mensaje) => {
        console.log("✅ Reserva enviada al backend:", mensaje);
      })
      .catch((error) => {
        console.error("❌ Error al enviar reserva al backend:", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow"
    >
      <h3 className="text-xl font-bold mb-4">Reserva tu cupo</h3>

      {/* Campo hora si hay horas disponibles */}
      {horasDisponibles && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Hora disponible
          </label>
          <select
            name="hora"
            value={form.hora}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Seleccione una hora</option>
            {horasDisponibles.map((hora) => (
              <option key={hora} value={hora}>
                {hora}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Agregar al Carrito
      </button>
    </form>
  );
};

export default ReservaForm;
