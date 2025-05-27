import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Reserva {
  servicio: string; // <-- ¡AHORA ES OBLIGATORIO!
  especialidad?: string;
  fecha?: string;
  hora?: string;
  precio: number; // <-- Sigue siendo obligatorio
  sesiones?: number;
  terapeutaId?: string;
  clienteId?: string;
  cantidad?: number;
  nombre?: string;
  categoria?: string;
  id?: number;
  correo?: string;
}

interface CartContextType {
  cart: Reserva[];
  addToCart: (item: Reserva) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Reserva[]>([]);

  const addToCart = (item: Reserva) => {
    // Validar servicio: debe ser un string no vacío.
    if (typeof item.servicio !== "string" || item.servicio.trim() === "") {
      console.error(
        "Error: El 'servicio' del ítem debe ser una cadena de texto no vacía."
      );
      // Puedes lanzar un error aquí o no añadir el ítem
      return;
    }

    // Validar precio: debe ser un número válido y no nulo/indefinido.
    if (
      typeof item.precio !== "number" ||
      isNaN(item.precio) ||
      item.precio === null ||
      item.precio === undefined
    ) {
      console.error("Error: El 'precio' del ítem debe ser un número válido.");
      // Puedes lanzar un error aquí o no añadir el ítem
      return;
    }

    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index: number) =>
    setCart((prev) => prev.filter((_, i) => i !== index));
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
