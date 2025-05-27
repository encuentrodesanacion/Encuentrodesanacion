import React from "react"; // Asegúrate de importar React
import { useNavigate } from "react-router-dom";
import "../styles/terapiaDeLuz.css"; // Asegúrate que esta ruta sea correcta
import ReservaForm from "../components/ReservaForm"; // Si este componente se usa, que esté la ruta correcta
import CartIcon from "../components/CartIcon"; // Asegúrate que la ruta sea correcta
import { useCart, Reserva } from "./CartContext"; // Importa 'Reserva' si no lo haces

interface TallerItem {
  src: string;
  alt: string;
  descripcion: string;
  link: string;
  precio: number; // Añadimos 'precio' a la interfaz del taller
}

const talleres: TallerItem[] = [
  // Tipamos el array de talleres
  {
    src: "https://media.istockphoto.com/id/636379014/es/foto/manos-la-formaci%C3%B3n-de-una-forma-de-coraz%C3%B3n-con-silueta-al-atardecer.jpg?s=612x612&w=0&k=20&c=R2BE-RgICBnTUjmxB8K9U0wTkNoCKZRi-Jjge8o_OgE=",
    alt: "Taller de alta vibración",
    descripcion:
      "Es una terapia que ayuda a sanar desde las emocionalidades logrando así encontrarte con tu verdadero yo",
    link: "#",
    precio: 30000, // <-- ¡Añade el precio aquí!
  },
  {
    src: "https://wallpapers.com/images/featured/imagenes-lindas-para-perfil-estetico-r521rmfa6ucixtw5.jpg",
    alt: "Taller de Péndulo Hebreo",
    descripcion: "Texto de prueba",
    link: "#",
    precio: 30000, // <-- ¡Añade el precio aquí!
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAS92gYn8cWwD9JqRAUleYJiHgMO4bjEfFug&s",
    alt: "Cabina de luz azul",
    descripcion: "Texto de Prueba",
    link: "#",
    precio: 30000, // <-- ¡Añade el precio aquí!
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1695405363183-e55554168063?fm=jpg&q=60&w=3000",
    alt: "Taller de Conexión Interior",
    descripcion: "Texto de prueba 2",
    link: "#",
    precio: 30000, // <-- ¡Añade el precio aquí!
  },
  {
    src: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg",
    alt: "Terapia combinada",
    descripcion: "Texto de prueba 3",
    link: "#",
    precio: 30000, // <-- ¡Añade el precio aquí!
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFvoRX4Y_mAxPaWqaHP5XBrWmjd47UfiM0A&s",
    alt: "Fototerapia LED",
    descripcion: "Texto de prueba 4",
    link: "#",
    precio: 30000, // <-- ¡Añade el precio aquí!
  },
];

export default function TallerMensual() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const reservarTaller = (tallerTitle: string, tallerPrecio: number) => {
    // Validaciones básicas antes de añadir al carrito
    if (!tallerTitle || tallerTitle.trim() === "") {
      alert("Error: El nombre del taller no es válido.");
      return;
    }
    if (
      typeof tallerPrecio !== "number" ||
      isNaN(tallerPrecio) ||
      tallerPrecio <= 0
    ) {
      alert("Error: El precio del taller no es válido o es cero.");
      return;
    }

    const reserva: Reserva = {
      // Tipamos el objeto explícitamente
      servicio: tallerTitle, // <--- ¡Ahora el servicio es el título real del taller!
      especialidad: tallerTitle, // La especialidad podría ser el mismo título del taller o ajustarse
      fecha: "", // Deja vacíos si no son relevantes para este tipo de reserva
      hora: "", // Deja vacíos si no son relevantes
      precio: tallerPrecio, // <--- ¡Usa el precio que viene del objeto taller!
      sesiones: 4, // Valor fijo para este tipo de taller
    };

    // --- CONSOLE.LOG PARA DEPURACIÓN ---
    console.log(
      "Objeto Reserva a añadir al carrito desde TallerMensual:",
      reserva
    );
    // --- FIN CONSOLE.LOG ---

    addToCart(reserva);
    alert(`Reserva agregada: 4 sesiones del taller ${tallerTitle}`);
  };

  return (
    <div className="min-h-screen bg-white pt-24 px-6">
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50 flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">Taller Mensual</h1>
        <CartIcon />
      </header>

      <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
        Bienvenido al Taller Mensual
      </h2>

      <button
        onClick={() => navigate("/servicios")} // Revisa esta ruta si es a la que quieres volver
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Volver a Inicio
      </button>

      <p className="text-gray-700 text-lg max-w-3xl mx-auto text-center mt-4">
        Participa en nuestros talleres diseñados para tu crecimiento personal,
        espiritual y emocional. Elige el que más resuene contigo.
      </p>

      <h2 className="text-lg font-bold mt-6 mb-4">Talleres:</h2>

      <div className="flip-wrapper-container">
        {talleres.map(
          (
            tallerActual,
            index // Usamos 'tallerActual' para claridad
          ) => (
            <div key={index} className="flip-wrapper">
              <div className="flip-card">
                {/* Frente de la tarjeta */}
                <div className="flip-front">
                  <img src={tallerActual.src} alt={tallerActual.alt} />
                </div>

                {/* Reverso de la tarjeta */}
                <div className="flip-back">
                  <div className="text-center font-semibold text-gray-700 p-2 border-b">
                    {tallerActual.alt}
                  </div>

                  <div
                    className="overflow-y-auto"
                    style={{ maxHeight: "180px", boxSizing: "border-box" }}
                  >
                    <p className="text-xs text-gray-700 italic mb-2">
                      {tallerActual.descripcion}
                    </p>

                    <div className="p-4 space-y-2">
                      <p className="text-xs text-gray-600">
                        Duración: 1 mes (60 minutos por semana)
                      </p>
                      <p className="text-xs text-gray-600">
                        Precio: ${tallerActual.precio.toLocaleString()} CLP{" "}
                        {/* Muestra el precio del objeto */}
                      </p>
                      {/* Si ReservaForm es solo para reservar hora y NO para añadir al carrito, déjalo así */}
                      {/* Si este botón añade al carrito, entonces debes decidir si quieres usar ReservaForm o el botón directo */}
                      <ReservaForm
                        servicio="Taller Mensual" // Esto es una prop, no el servicio real del taller
                        terapeuta={tallerActual.alt}
                        horasDisponibles={["10:00", "18:00"]}
                      />
                      {/* Botón para añadir directamente desde aquí (sin usar ReservaForm si el flujo es directo) */}
                      {/* Este es el botón que llama a reservarTaller */}
                      <button
                        type="button"
                        onClick={() =>
                          reservarTaller(tallerActual.alt, tallerActual.precio)
                        }
                        className="w-full mt-4 px-2 py-2 border rounded bg-pink-600 text-white hover:bg-pink-700"
                      >
                        Reservar Taller Directo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
