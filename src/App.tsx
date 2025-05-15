// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Terapias from "./pages/Terapiasdeluz";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import { CartProvider } from "./pages/CartContext";
import ReservaForm from "./components/ReservaForm";
import Carrito from "./components/Carrito";
import CartIcon from "./components/CartIcon";
import TratamientoHolistico from "./pages/TratamientoIntegral";
import Alianzas from "./pages/Alianzas";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <CartIcon />

        {/* Asegúrate de que quieres mostrar siempre esta barra */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terapeutasdeluz" element={<Terapias />} />
          <Route
            path="/tratamientointegral"
            element={<TratamientoHolistico />}
          />
          <Route path="/alianzas" element={<Alianzas />} />
          {/* Ruta que redirige a la página principal si no hay coincidencias */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
