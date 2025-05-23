// App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Terapias from "./pages/Terapiasdeluz";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./pages/CartContext";

import CartIcon from "./components/CartIcon";
import TratamientoHolistico from "./pages/TratamientoIntegral";

import TallerMensual from "./pages/TalleresMensuales";
import QuienesSomosPage from "./pages/QuienesSomos";
import TerapeutasPage from "./pages/Staff";
import ComunidadYLeadsPage from "./pages/ComunidadyLeads";
import SpaPrincipal from "./pages/SpaPrincipal";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <CartIcon />

        {/* Asegúrate de que quieres mostrar siempre esta barra */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terapeutasdeluz" element={<Terapias />} />
          <Route
            path="/tratamientointegral"
            element={<TratamientoHolistico />}
          />

          {/* Ruta que redirige a la página principal si no hay coincidencias */}
          <Route path="/tallermensual" element={<TallerMensual />} />
          <Route path="/quienes-somos" element={<QuienesSomosPage />} />
          <Route path="/staff-terapéutico" element={<TerapeutasPage />} />

          <Route path="/spaprincipal" element={<SpaPrincipal />} />
          <Route path="/nuestra-comunidad" element={<ComunidadYLeadsPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
