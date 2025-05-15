import { useNavigate } from "react-router-dom";
import "../styles/terapiaDeLuz.css";
import "../components/ReservaHora";
import ReservaForm from "../components/ReservaForm";
import CartIcon from "../components/CartIcon"; // Icono del carrito

const imagenes = [
  {
    src: "https://media.istockphoto.com/id/636379014/es/foto/manos-la-formaci%C3%B3n-de-una-forma-de-coraz%C3%B3n-con-silueta-al-atardecer.jpg?s=612x612&w=0&k=20&c=R2BE-RgICBnTUjmxB8K9U0wTkNoCKZRi-Jjge8o_OgE=",
    alt: "Sesión de alta vibración que sirve para eliminar enfermedades y/o sanar",
    descripcion:
      "Es una terapia que ayuda a sanar desde las emocionalidades logrando así encontrarte asi con tu verdadero yo",
    link: "#",
  },
  {
    src: "https://wallpapers.com/images/featured/imagenes-lindas-para-perfil-estetico-r521rmfa6ucixtw5.jpg",
    alt: "Sesión de Pendulo Hebreo",
    descripcion: "Texto de prueba",
    link: "#",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAS92gYn8cWwD9JqRAUleYJiHgMO4bjEfFug&s",
    alt: "Cabina de luz azul",
    descripcion: "Texto de Prueba",
    link: "#",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1695405363183-e55554168063?fm=jpg&q=60&w=3000",
    alt: "Texto de prueba 2 ",
    link: "#",
  },
  {
    src: "https://www.shutterstock.com/image-illustration/david-street-style-graphic-designtextile-600nw-2265632523.jpg",
    alt: "Terapia combinada",
    descripcion: "Texto de prueba 3",
    link: "#",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFvoRX4Y_mAxPaWqaHP5XBrWmjd47UfiM0A&s",
    alt: "Fototerapia LED",
    descripcion: "Texto de prueba 4",
    link: "#",
  },
];

export default function Terapias() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header fijo con el carrito */}
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50 flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">Terapias de Luz</h1>
        <CartIcon />
      </header>

      {/* Contenido principal */}
      <div
        style={{
          padding: "2rem",
          paddingTop: "6rem", // espacio para el header
          backgroundColor: "#fefefe",
        }}
      >
        <button
          onClick={() => navigate("servicios")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Volver a Inicio
        </button>

        <h2 className="text-lg font-bold mt-6 mb-4">Terapeutas:</h2>

        <div className="flip-wrapper-container">
          {imagenes.map((img, index) => (
            <div key={index} className="flip-wrapper">
              <div className="flip-card">
                {/* Frente de la tarjeta */}
                <div className="flip-front">
                  <img src={img.src} alt={img.alt} />
                </div>

                {/* Reverso de la tarjeta */}
                <div className="flip-back">
                  <div className="text-center font-semibold text-gray-700 p-2 border-b">
                    {img.alt}
                  </div>

                  <div
                    className="overflow-y-auto"
                    style={{ maxHeight: "180px", boxSizing: "border-box" }}
                  >
                    <p className="text-xs text-gray-700 italic mb-2">
                      {img.descripcion}
                    </p>

                    <div className="p-4 space-y-2">
                      <p className="text-xs text-gray-600">
                        Duración: 1 mes (60 minutos por semana, cada semana)
                      </p>
                      <p className="text-xs text-gray-600">
                        Precio: $30.000 CLP / 40USD
                      </p>
                      <ReservaForm
                        servicio="Terapeutas de la Luz"
                        terapeuta={img.alt}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
