import CartIcon from "../components/CartIcon";
import { useNavigate } from "react-router-dom";
import "../styles/terapiaDeLuz.css";
import { useCart } from "./CartContext"; // ← importa el contexto del carrito

export default function TratamientoHolistico() {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ← accede a la función global

  const terapias = [
    {
      img: "https://ethic.es/wp-content/uploads/2023/03/imagen.jpg",
      title: "Sanación Integral",
      description: "Equilibrio físico, mental y espiritual.",
    },
    {
      img: "https://www.theclassyoga.com/wp-content/uploads/2021/08/yoga-1024x576.jpeg",
      title: "Terapia Energética",
      description: "Limpieza de bloqueos y armonización.",
    },
    {
      img: "https://a.storyblok.com/f/97382/2000x1500/4c15e1224b/cover-benefits-of-yoga-and-meditation.png",
      title: "Reiki",
      description: "Canalización de energía para armonizar chakras.",
    },
    {
      img: "https://via.placeholder.com/300x200",
      title: "Liberación Emocional",
      description: "Técnicas para soltar traumas y bloqueos.",
    },
  ];

  // 🔁 Función para agregar al carrito según sesiones
  const reservarSesion = (
    terapia: string,
    sesiones: number,
    precio: number
  ) => {
    const reserva = {
      servicio: "Tratamiento Integral",
      especialidad: terapia, // usamos el título como terapeuta
      fecha: "", // opcional por ahora
      hora: "",
      precio,
      sesiones,
    };

    addToCart(reserva);
    alert(`Reserva agregada: ${sesiones} sesiones de ${terapia}`);
  };

  return (
    <div className="min-h-screen bg-white pt-24 px-6">
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50 flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Tratamiento Integral
        </h1>
        <CartIcon />
      </header>

      <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
        Bienvenido al Tratamiento Integral
      </h2>
      <p className="text-gray-700 text-lg max-w-3xl mx-auto text-center">
        Este tratamiento incluye sesiones personalizadas orientadas a tu
        bienestar físico, emocional y espiritual.
      </p>

      <div className="flip-wrapper-container mt-10">
        {terapias.map((t, i) => (
          <div key={i} className="flip-wrapper">
            <div className="flip-card">
              <div className="flip-front">
                <img src={t.img} alt={t.title} />
              </div>
              <div className="flip-back">
                <h3 className="mb-2 font-bold">{t.title}</h3>
                <p className="mb-2">{t.description}</p>
                <form
                  className="w-full px-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <button
                    type="button"
                    onClick={() => reservarSesion(t.title, 3, 55000)}
                    className="w-full mb-2 px-2 py-1 border rounded bg-pink-600 text-white hover:bg-pink-700"
                  >
                    3 sesiones ($55.000 / 60USD)
                  </button>
                  <button
                    type="button"
                    onClick={() => reservarSesion(t.title, 4, 70000)}
                    className="w-full mb-2 px-2 py-1 border rounded bg-pink-600 text-white hover:bg-pink-700"
                  >
                    4 sesiones ($70.000 / 75USD)
                  </button>
                  <button
                    type="button"
                    onClick={() => reservarSesion(t.title, 5, 85000)}
                    className="w-full mb-2 px-2 py-1 border rounded bg-pink-600 text-white hover:bg-pink-700"
                  >
                    5 sesiones ($85.000 / 90USD)
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-10 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 block mx-auto"
      >
        Volver al Inicio
      </button>
    </div>
  );
}
