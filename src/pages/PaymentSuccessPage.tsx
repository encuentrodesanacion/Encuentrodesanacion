// src/pages/PaymentSuccessPage.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../pages/CartContext"; // Importa useCart para acceder a clearCart

function PaymentSuccessPage() {
  const location = useLocation();
  const { clearCart } = useCart(); // Desestructura clearCart del contexto del carrito
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Obtener el token de la URL (ej. ?token=...)
    const params = new URLSearchParams(location.search);
    const receivedToken = params.get("token");
    if (receivedToken) {
      setToken(receivedToken);
    }

    // Llama a clearCart una vez que la página de éxito se monta
    // Esto asegura que el carrito se vacíe después de un pago exitoso
    clearCart();

    // Las dependencias del useEffect son importantes para React
    // Si clearCart cambia (poco probable si es una función estable del contexto), se volvería a ejecutar.
  }, [location, clearCart]); // Asegúrate de incluir clearCart en las dependencias

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          ✅ ¡Pago Exitoso!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Tu reserva ha sido confirmada con éxito.
        </p>
        {token && (
          <p className="text-sm text-gray-500">
            Número de referencia: <strong>{token}</strong>
          </p>
        )}
        <div className="mt-8">
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
