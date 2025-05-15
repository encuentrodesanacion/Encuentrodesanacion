import React, { useState } from "react";
import { useCart, Reserva } from "../pages/CartContext";

const Carrito = () => {
  const { cart, removeFromCart } = useCart();

  // Estado para controlar si mostrar el formulario de contacto
  const [showForm, setShowForm] = useState(false);

  // Estado para inputs de contacto
  const [contactInfo, setContactInfo] = useState({
    nombreApellido: "",
    telefono: "",
  });

  const handleRemoveItem = (index: number) => {
    removeFromCart(index);
  };

  // Mostrar formulario al presionar el botón
  const handleProceedToPayment = () => {
    console.log("Proceder al pago clickeado");
    setShowForm(true);
  };

  // Manejo de cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar formulario y llamar backend
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactInfo.nombreApellido || !contactInfo.telefono) {
      alert("Por favor completa todos los campos para continuar.");
      return;
    }

    try {
      const response = await fetch("/api/create_preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          nombreApellido: contactInfo.nombreApellido,
          telefono: contactInfo.telefono,
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point; // Redirige al checkout Mercado Pago
      } else {
        alert("Error al crear preferencia de pago.");
      }
    } catch (error) {
      console.error("Error en pago:", error);
      alert("Error al procesar el pago.");
    }
  };

  // Calcular total
  const total = cart.reduce((acc, item) => acc + item.precio, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
        Tu Carrito de Reservas
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-xl text-gray-500">
          No tienes reservas en el carrito.
        </p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item: Reserva, index: number) => (
              <li
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <p className="font-bold text-lg">{item.servicio}</p>
                  <p className="text-gray-600">Fecha: {item.fecha}</p>
                  <p className="text-gray-600">Hora: {item.hora}</p>
                  <p className="text-gray-600">Sesiones: {item.sesiones}</p>
                  <p className="text-gray-600 font-semibold">
                    Precio: ${item.precio}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            {!showForm ? (
              <>
                <button
                  onClick={handleProceedToPayment}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
                >
                  Proceder al Pago
                </button>
                <p className="text-xl font-bold">Total: ${total}</p>
              </>
            ) : (
              <form
                onSubmit={handlePaymentSubmit}
                className="flex flex-col space-y-4 w-full max-w-sm"
              >
                <input
                  type="text"
                  name="nombreApellido"
                  placeholder="Nombre y Apellido"
                  value={contactInfo.nombreApellido}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Número de Whatsapp"
                  value={contactInfo.telefono}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Confirmar y Pagar
                </button>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
