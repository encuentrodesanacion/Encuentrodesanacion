import { useNavigate } from "react-router-dom";
import "../styles/terapiaDeLuz.css";
import "../components/ReservaHora";
import ReservaForm from "../components/ReservaForm";
import CartIcon from "../components/CartIcon"; // Icono del carrito
import terapeuta3 from "../assets/Terapeuta3.jpg";
import Terapeuta7 from "../assets/Terapeuta7.jpg";
import terapeuta9 from "../assets/Terapeuta9.jpg";
import terapeuta6 from "../assets/Terapeuta6.jpg";
import creadorvirtual from "../assets/creadorvirtual.jpg";

const imagenes = [
  {
    src: terapeuta3,
    alt: "Canalización",
    descripcion:
      "La Canalización es la capacidad de recibir información energética a través de la intuición y los sentidos sutiles. Se caracteriza por la conexión con guías espirituales, la percepción extrasensorial y la apertura a energías elevadas. En este curso exploraremos la glándula pineal, el aura, los elementales y la comunicación animal, integrando técnicas prácticas para fortalecer la recepción de mensajes energéticos. Los beneficios son desarrollar herramientas esenciales para lograr claridad intuitiva, expansión sensorial y fortalecimiento de la conexión energética",
    link: "#",
    terapeuta: "Mónica Gatica",
  },
  {
    src: Terapeuta7,
    alt: "Limpieza con Cruz de Anhk",
    descripcion:
      "El ankh, cruz ankh o llave de la vida, es un símbolo muy antiguo, muy asociada al antiguo Egipto, donde grandes Dioses y faraones. Sus bendiciones son múltiples, por ello, en esta formación viajáremos hacia el pasado, para conocer la historia y significado del Ankh y como poder poner sus virtudes al servicio de todos los involucrados. También aprenderás los tipos de contamines que podremos diagnosticar con ayuda del péndulo, en personas, espacio u objeto, y obviamente como limpiarnos con nuestra amada Cruz Ankh",
    link: "#",
    terapeuta: "Fabiola Valenzuela",
  },
  {
    src: terapeuta9,
    alt: "Tarot",
    descripcion:
      "En esta formación aprenderás a conectar con tu intuición para ir descubriendo el lenguaje mágico del Tarot, preparar tu espacio y consagrar tus cartas. podras interpretar los símbolos y colores de los arcanos y utilizar tu tarot como una fuente inagotable de información que sera tu guía tanto de desarrollo personal como también  una forma de meditación , aprenderas diferentes tipos de tiradas que te servirán para orientar a otros y comenzar este hermoso camino espiritual",
    link: "#",
    terapeuta: "Jacqueline Zepeda",
  },
  {
    src: terapeuta6,
    alt: "Reprogramación Neurolingüistica Emocional",
    descripcion:
      "¿Quieres multiplicar tus éxitos y despertar tu máximo potencial? En este curso descubrirás cómo leer e influir en el lenguaje corporal, facial y verbal para comunicar con verdadera autoridad; activar anclajes que disparen estados de alto rendimiento al instante; y derribar creencias limitantes que frenan tu crecimiento y el de quienes acompañas. Desarrollarás una empatía poderosa y un rapport inmediato que te abrirá puertas, aprenderás a diseñar objetivos claros y estrategias de automotivación infalibles, y a gestionar el estrés para mantenerte en equilibrio pleno. Ideal para terapeutas, psicólogos, gerentes, empresarios, profesores… y para todo aquel que quiera liderar con autenticidad y generar cambios extraordinarios.",
    link: "#",
    terapeuta: "Macarena del Río",
  },
  {
    src: creadorvirtual,
    alt: "Terapia combinada",
    descripcion: "Texto de prueba 3",
    link: "#",
    terapeuta: "Texto de prueba",
  },
  {
    src: creadorvirtual,
    alt: "texto de prueba",
    descripcion: "Texto de prueba 4",
    link: "#",
    terapeuta: "texto de prueba",
  },
];

export default function Terapias() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header fijo con el carrito */}
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50 flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Formación Terapeutas de la Luz
        </h1>
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

        <h2 className="text-lg font-bold mt-6 mb-4">Menciones:</h2>

        <div className="flip-wrapper-container">
          {imagenes.map((img, index) => (
            <div key={index} className="flip-wrapper">
              <div className="flip-card">
                {/* Frente de la tarjeta */}
                <div className="flip-front">
                  <img src={img.src} alt={img.alt} />
                  <div className="nombre-overlay">
                    <p>{img.terapeuta}</p>
                  </div>
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
