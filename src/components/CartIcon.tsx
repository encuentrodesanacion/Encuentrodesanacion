import { useEffect, useRef, useState } from "react";
import { useCart } from "../pages/CartContext";
import { ShoppingCart } from "lucide-react";
import type { Reserva } from "../pages/CartContext";

const CartIcon = () => {
  const { cart, removeFromCart, clearCart } = useCart(); // 🆕 Asegúrate de tener clearCart en tu contexto
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.precio ?? 0), 0);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const notifyTerapeuta = async (reserva: Reserva) => {
    try {
      const response = await fetch("http://localhost:3000/api/enviar-reserva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reserva),
      });

      if (response.ok) {
        console.log("Notificación enviada al terapeuta.");
      } else {
        console.error("Error al enviar la notificación.");
      }
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  };

  const handleConfirmarCompra = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/crear-transaccion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 10000, // Monto de prueba o real
            buyOrder: `orden_${Date.now()}`, // Genera orden única
            sessionId: `session_${Date.now()}`, // ID único de sesión
            returnUrl: "http://localhost:5173/pago-exitoso", // Ruta a donde volver después del pago
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error creando la transacción");
      }

      const data = await response.json();

      // Redirigir a Webpay con token
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.url;

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "token_ws";
      input.value = data.token;

      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error al proceder al pago:", error);
      alert("No se pudo iniciar el pago.");
    }
  };
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showToast]);
  return (
    <div>
      <div
        className="fixed top-4 right-4 z-50 cursor-pointer bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        <ShoppingCart size={24} />
        <span className="text-xs absolute top-0 right-0 bg-red-600 text-white rounded-full px-1">
          {cart.length}
        </span>
      </div>

      {open && (
        <div
          ref={panelRef}
          className="fixed top-16 right-4 z-40 bg-white shadow-lg rounded-lg p-4 w-80 max-h-[70vh] overflow-y-auto"
        >
          <h3 className="text-lg font-semibold mb-2">Tu Carrito</h3>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500">No hay reservas.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {cart.map((item, index) => (
                <li key={index} className="border-b pb-2">
                  <p>
                    <strong>Servicio:</strong> {item.servicio}
                  </p>
                  <p>
                    <strong>Especialidad:</strong> {item.especialidad}
                  </p>
                  {item.sesiones && (
                    <p>
                      <strong>Sesiones:</strong> {item.sesiones}
                    </p>
                  )}
                  {item.hora && (
                    <p>
                      <strong>Hora:</strong> {item.hora}
                    </p>
                  )}
                  {item.fecha && (
                    <p>
                      <strong>Fecha:</strong> {item.fecha}
                    </p>
                  )}
                  <p>
                    <strong>Precio:</strong> ${item.precio?.toLocaleString()}
                  </p>
                  <button
                    className="mt-1 text-red-500 hover:text-red-700 text-xs underline"
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        `¿Estás seguro de que deseas eliminar la terapia de "${item.servicio}" del carrito?`
                      );
                      if (confirmDelete) {
                        removeFromCart(index);
                      }
                    }}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 text-right font-semibold">
            Total: ${total.toLocaleString()}
          </div>
          <button
            onClick={handleConfirmarCompra}
            disabled={isProcessing}
            className={`mt-4 w-full py-2 rounded text-white ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isProcessing ? "Procesando..." : "Proceder al Pago"}
          </button>
        </div>
      )}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity animate-fade-in-out z-50">
          ✅ ¡Tu reserva ha sido confirmada!
        </div>
      )}
    </div>
  );
};

export default CartIcon;
