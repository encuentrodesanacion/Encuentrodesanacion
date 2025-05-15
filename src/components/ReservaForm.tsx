import React, { useState } from "react";
import { useCart, Reserva } from "../pages/CartContext";

interface ReservaFormProps {
  servicio: string;
  terapeuta: string; // ← Este es el prop correcto que recibes
}

const ReservaForm = ({ servicio, terapeuta }: ReservaFormProps) => {
  const { addToCart } = useCart();

  const [form, setForm] = useState({
    fecha: "",
    hora: "",
    precio: 30000, // Valor fijo por ahora
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nuevaReserva: Reserva = {
      servicio,
      especialidad: terapeuta, // ← Aquí se guarda el terapeuta como especialidad
      fecha: form.fecha,
      hora: form.hora,
      precio: form.precio,
    };

    addToCart(nuevaReserva);
    alert("Reserva agregada al carrito");

    setForm({
      fecha: "",
      hora: "",
      precio: 30000,
    });

    // 👇 ENVÍO AUTOMÁTICO AL BACKEND CON FETCH
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
        clienteId: 0, // Puedes cambiar esto si tienes un ID real del cliente
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
