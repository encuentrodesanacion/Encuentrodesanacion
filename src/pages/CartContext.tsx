import { ReactNode, createContext, useContext, useState } from "react";

// Define el tipo de cada ítem en el carrito

// CartContext.tsx
export interface Reserva {
  servicio?: string;
  especialidad?: string;
  fecha?: string;
  hora?: string;
  precio: number;
  sesiones?: number;
  terapeutaId?: string;
  clienteId?: string;
  cantidad?: number;
  nombre?: string;
  categoria?: string;
  id?: number; // Si decides mantener el campo id opcional
}

// Crear el contexto para el carrito de compras
export const CartContext = createContext<{
  cart: Reserva[];
  addToCart: (item: Reserva) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

// El componente CartProvider
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Reserva[]>([]);

  const addToCart = (item: Reserva) => setCart((prev) => [...prev, item]);

  const removeFromCart = (id: number) =>
    setCart((prev) => prev.filter((_, index) => index !== id));

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para acceder al contexto del carrito
export const useCart = () => useContext(CartContext);
