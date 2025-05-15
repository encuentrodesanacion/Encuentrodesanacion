import { useEffect, useRef, useState } from "react";
import { useCart } from "../pages/CartContext";
import { ShoppingCart } from "lucide-react";
import type { Reserva } from "../pages/CartContext";

const CartIcon = () => {
  const { cart, removeFromCart } = useCart(); // Asegúrate de destructurar removeFromCart aquí
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null); // 🔑 Referencia al panel

  const total = cart.reduce((acc, item) => acc + item.precio, 0);

  // 🔒 Cierra el carrito si haces clic fuera de él
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

  // Función para notificar al terapeuta
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

  // Función que se ejecuta cuando se confirma la compra
  const handleConfirmarCompra = () => {
    cart.forEach((item) => {
      // Notificar al terapeuta por cada reserva en el carrito
      notifyTerapeuta(item);
    });
  };

  return (
    <div>
      {/* Ícono flotante */}
      <div
        className="fixed top-4 right-4 z-50 cursor-pointer bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        <ShoppingCart size={24} />
        <span className="text-xs absolute top-0 right-0 bg-red-600 text-white rounded-full px-1">
          {cart.length}
        </span>
      </div>

      {/* Panel flotante del carrito */}
      {open && (
        <div
          ref={panelRef} // 🧠 Aquí está el ref para detectar clics fuera
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
                  <p>
                    <strong>Sesiones:</strong> {item.sesiones}
                  </p>
                  <p>
                    <strong>Precio:</strong> ${item.precio.toLocaleString()}
                  </p>
                  <button
                    className="mt-1 text-red-500 hover:text-red-700 text-xs underline"
                    onClick={() => {
                      // Mostrar ventana de confirmación
                      const confirmDelete = window.confirm(
                        `¿Estás seguro de que deseas eliminar la terapia de "${item.servicio}" del carrito?`
                      );
                      if (confirmDelete) {
                        removeFromCart(index); // Eliminar solo si el usuario confirma
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
            onClick={handleConfirmarCompra} // Confirmación de la compra
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Proceder al Pago
          </button>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
