import CartIcon from "../components/CartIcon";
import { useNavigate } from "react-router-dom";
import "../styles/tratamientoIntegral.css";
import { useCart } from "./CartContext";

import Terapeuta1 from "../assets/Terapeuta1.jpg";
import Terapeuta2 from "../assets/Terapeuta2.jpg";
import Terapeuta3 from "../assets/Terapeuta3.jpg";
import Terapeuta4 from "../assets/Terapeuta4.jpg";
import Terapeuta5 from "../assets/Terapeuta5.jpg";
import creadorvirtual from "../assets/creadorvirtual.jpg";
import Terapeuta8 from "../assets/Terapeuta8.jpg";

export default function SpaPrincipal() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const terapias = [
    {
      img: Terapeuta1,
      title: "Canalización Energetica",
      terapeuta: "Brenda Rivas",
      description:
        "es una terapia en la cual una persona actúa como un conducto para recibir mensajes de guías espirituales,angeles, maestros ascendidos y seres fallecidos. Es una herramienta poderosa para la conexión con lo divino u el crecimiento personal. Es una forma de recibir orientación espiritual, sanar emocionalmente y obtener claridad sobre diversos aspectos de la vida",
      opciones: [{ sesiones: 3, precio: 55000 }],
    },
    {
      img: Terapeuta2,
      title: "Limpieza de Espacios",
      terapeuta: "Betsy Bolivar",
      description:
        "La limpieza energética de espacios es una práctica que busca eliminar energías negativas y restaurar un flujo de energía positivo en un lugar. Se basa en la idea de que las emociones, pensamientos y experiencias acumuladas, incluso liberación de entidades  no contributivas, pueden generar vibraciones bajas que afectan el bienestar de quienes habitan el espacio. Al eliminar bloqueos energéticos, se puede sentir una mayor vitalidad y energía",
      opciones: [
        { sesiones: 3, precio: 55000 },
        { sesiones: 4, precio: 70000 },
        { sesiones: 5, precio: 85000 },
      ],
    },
    {
      img: Terapeuta3,
      title: "Liberación Memorias Uterinas",
      terapeuta: "Mónica García",
      description:
        "Es una terapia para conectar con nuestro Centro Creativo, el útero sagrado y liberar patrones de creencias y conductas, miedos, que van pasando de generación en generación por el linaje femenino.  Traerá un nuevo flujo energético promoviendo la armonía, el bienestar y el empoderamiento femenino.",
      opciones: [{ sesiones: 3, precio: 55000 }],
    },
    {
      img: creadorvirtual,
      title: "Constelaciones Familiares",
      terapeuta: "Paulina Villablanca",
      description:
        "Es una herramienta terapéutica para tratar conflictos personales, familiares y laborales mediante la visualización de representantes que nos permiten tomar decisiones y reconciliarnos con nuestro linaje",
      opciones: [
        { sesiones: 3, precio: 55000 },
        { sesiones: 4, precio: 70000 },
      ],
    },
    {
      img: Terapeuta5,
      title: "Purificación y limpieza de energías negativas",
      terapeuta: "Sandra Da Silva",
      description:
        "Te sientes agotado/a sin mayor razón? ¿Te sientes desmotivado/a y sin propósito? ¿Sufres de dolores de cabeza, dolores físicos y malestar sin causa de enfermedad aparente? ¿Tu entorno es un constante caos, peleas y conflictos? ¿Tus planes no prosperan ni avanzan? ¡Está es la Terapia adecuada para ti, porque nos permite diagnosticar, cortar, limpiar y liberar energías densas relacionadas a la hechiceria, magia blanca o negra, entidades impuestas, envidia, malos pensamientos y deseos, parásitos y larvas astrales!",
      opciones: [
        { sesiones: 3, precio: 55000 },
        { sesiones: 4, precio: 70000 },
      ],
    },
    {
      img: creadorvirtual,
      title: "Péndulo Hebreo",
      terapeuta: "Rosa Santimone",
      description:
        "Es una terapia de armonizacion energética que permite detectar y eliminar energías negativas, restaurando el equilibrio  del cuerpo, diagnosticar  el estado de los Chakras y sistemas  del cuerpo, regenerar y equilibrar su energía, potencia el crecimiento  personal, limpia y armoniza el aura y a través de la cromoterapia otorgar mayores beneficios al consultante",
      opciones: [
        { sesiones: 3, precio: 55000 },
        { sesiones: 4, precio: 70000 },
      ],
    },
    {
      img: Terapeuta8,
      title: "Lectura de Runas",
      terapeuta: "Ana Luisa Solvervicens",
      description:
        "Cuenta la leyenda que Odín, buscando la sabiduría, se sacrifica y de su sangre brotan las runas. Este oráculo te entrega orientación y respuestas a inquietudes, problemas y todas las consultas que puedas tener.",
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
        <h1 className="text-xl font-semibold text-gray-800">Spa Principal</h1>
        <CartIcon />
      </header>

      <button
        onClick={() => navigate("/")}
        className="fixed top-20 left-6 z-40 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Volver al Inicio
      </button>

      <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
        Bienvenido al Spa Principal
      </h2>
      <p className="text-gray-700 text-lg max-w-3xl mx-auto text-center">
        Este espacio...
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
