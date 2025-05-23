import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Reserva {
  servicio?: string;
  especialidad?: string;
  fecha?: string;
  hora?: string;
  precio?: number;
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

  const addToCart = (item: Reserva) => setCart((prev) => [...prev, item]);
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
