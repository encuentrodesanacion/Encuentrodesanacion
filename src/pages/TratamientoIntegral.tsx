import CartIcon from "../components/CartIcon";
import { useNavigate } from "react-router-dom";
import "../styles/tratamientoIntegral.css";
import { useCart } from "./CartContext";

import Terapeuta1 from "../assets/Terapeuta1.jpg";
import Terapeuta2 from "../assets/Terapeuta2.jpg";
import Terapeuta3 from "../assets/Terapeuta3.jpg";
import Terapeuta4 from "../assets/Terapeuta4.jpg";
import Terapeuta5 from "../assets/Terapeuta5.jpg";
import Terapeuta6 from "../assets/Terapeuta6.jpg";
import Terapeuta7 from "../assets/Terapeuta7.jpg";

export default function TratamientoHolistico() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const terapias = [
    {
      img: Terapeuta1,
      title: "Canalización Energetica",
      terapeuta: "Brenda Rivas",
      description:
        "Es una terapia en la cual una persona actúa como un conducto para recibir mensajes de guías espirituales,angeles, maestros ascendidos y seres fallecidos. Es una herramienta poderosa para la conexión con lo divino u el crecimiento personal. Es una forma de recibir orientación espiritual, sanar emocionalmente y obtener claridad sobre diversos aspectos de la vida",
      opciones: [{ sesiones: 3, precio: 55000 }],
    },
    {
      img: Terapeuta2,
      title: "La limpieza de lealtades transgeneracionales",
      terapeuta: "Betsy Bolivar",
      description:
        "Un proceso terapéutico que busca identificar y liberar patrones de comportamiento, emociones y creencias que se transmiten de generación en generación dentro de una familia. Estas lealtades invisibles pueden influir en la salud, el bienestar emocional, las relaciones de las personas, la estabilidad económica.El objetivo principal es identificar y romper estos patrones para que las personas puedan vivir de manera más autónoma y alineada con sus propias necesidades y deseos.",
      opciones: [
        { sesiones: 3, precio: 55000 },
        { sesiones: 4, precio: 70000 },
        { sesiones: 5, precio: 85000 },
      ],
    },
    {
      img: Terapeuta3,
      title: "Tameana - Salush Nahí",
      terapeuta: "Mónica García",
      description:
        "Es una terapia vibracional que trabaja con cristales de cuarzo y geometría sagrada para armonizar chakras, liberar bloqueos y elevar la frecuencia energética. Se recomiendan ciclos de 3 sesiones para una transformación profunda.",
      opciones: [{ sesiones: 3, precio: 55000 }],
    },
    {
      img: Terapeuta4,
      title: "Péndulo Hebreo",
      terapeuta: "Nicole Rojas",
      description:
        "Libérate del estrés, mejora tu descanso y recupera tu energía con el Péndulo Hebreo. Esta técnica detecta y corrige desequilibrios energéticos, ayudándote a sentirte más liviano, claro y vital.",
      opciones: [
        { sesiones: 3, precio: 55000 },
        { sesiones: 4, precio: 70000 },
      ],
    },
    {
      img: Terapeuta5,
      title: "Terapia de Respuesta Espiritual (Con Conexión Angelical)",
      terapeuta: "Sandra Da Silva",
      description:
        "Esta maravillosa Técnica de Sanación te permitirá una conexión intima con tu Ser, nos ayudará a realizar una investigación para conocer todo aquello que quedo grabado en tu Alma y en tu mente subconsciente, que impide que evoluciones en esta vida y que puedas soltar que le pesa. Puedes solicitar este Tratamiento si quieres: Limpiar sentimientos, actitudes y emociones toxicas. (Ansiedad, Depresión, etc.) Limpiar patrones emocionales familiares, de pareja, laborales. Remover bloqueos de cualquier índole, incluyendo energías de bajo astral  (hechicería, magia negra, envidia, etc.). Re-conectarás con tu esencia para que puedas iniciar cambios positivos en tu vida.",
      opciones: [
        { sesiones: 3, precio: 55000 },
        { sesiones: 4, precio: 70000 },
      ],
    },
    {
      img: Terapeuta6,
      title: "Reiki Egipcio",
      terapeuta: "Macarena del Rio",
      description:
        "Sanación ancestral que canaliza energía vital y luz de alta vibración para armonizar cuerpo, mente y alma. A través de símbolos sagrados y la guía de diosas como Sekhmet, libera bloqueos energéticos, alivia ansiedad, fatiga y estrés, y te reconecta con tu poder interior. Equilibra tu energía. Despierta tu esencia.",
      opciones: [
        { sesiones: 3, precio: 55000 },
        { sesiones: 4, precio: 70000 },
      ],
    },
  ];

  const reservarSesion = (
    terapia: string,
    sesiones: number,
    precio: number
  ) => {
    const reserva = {
      servicio: "Tratamiento Integral",
      especialidad: terapia,
      fecha: "",
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

      <button
        onClick={() => navigate("/")}
        className="fixed top-20 left-6 z-40 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Volver al Inicio
      </button>

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
              <div className="flip-inner">
                <div className="flip-front">
                  <img src={t.img} alt={t.title} />
                  <div className="nombre-overlay">
                    <p>{t.terapeuta}</p>
                  </div>
                </div>
                <div className="flip-back">
                  <h3 className="mb-2 font-bold">{t.title}</h3>
                  <p className="mb-2">{t.description}</p>
                  <form
                    className="w-full px-2"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    {t.opciones.map((op, j) => (
                      <button
                        key={j}
                        type="button"
                        onClick={() =>
                          reservarSesion(t.title, op.sesiones, op.precio)
                        }
                        className="w-full mb-2 px-2 py-1 border rounded bg-pink-600 text-white hover:bg-pink-700"
                      >
                        {op.sesiones} sesiones (${op.precio.toLocaleString()}{" "}
                        CLP)
                      </button>
                    ))}
                  </form>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
