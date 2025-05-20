import "../styles/flipCards.css"; // Asegúrate de tener los estilos aquí o adaptarlos a Tailwind

import terapeuta3 from "../assets/Terapeuta3.jpg";

const alianzas = [
  {
    nombre: "Monica Gatica",
    url: "https://www.instagram.com/monicaingeborg.th/",
    imagen: terapeuta3,
    descripcion:
      "Mónica Gatica Sandoval, Terapeuta Holística Integrativa, especializada en el acompañamiento de procesos de sanación energética y empoderamiento personal. A través de herramientas como la Cruz de Ankh, el Péndulo Hebreo, la Radiestesia, la Canalización, Tameana, el Tarot y la armonización con frecuencias, facilita espacios de transformación profunda. Además, comparte su conocimiento a través de cursos y talleres, brindando a otros la oportunidad de explorar el mundo energético y aplicar estas técnicas en su vida.",
  },
  //   {
  //     nombre: "Encuentro de sanación",
  //     url: "https://www.instagram.com/encuentrodesanacion/",
  //     imagen: Encuentrodesanacion,
  //     descripcion: "Eventos de sanación y transformación. ¡Siente la energía!",
  //   },
  //   {
  //     nombre: "Tu Emprendimiento",
  //     url: "h",
  //     imagen: tuemprendimiento,
  //     descripcion: "Eventos de sanación y transformación. ¡Siente la energía!",
  //   },
  //   {
  //     nombre: "Encuentro de sanación",
  //     url: "https://www.instagram.com/encuentrodesanacion/",
  //     imagen: Encuentrodesanacion,
  //     descripcion: "Eventos de sanación y transformación. ¡Siente la energía!",
  //   },
];

const CarruselStaff = () => {
  return (
    <section className="bg-white py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-cyan-700">
        Staff Terapeutico
      </h2>
      <div className="flip-wrapper-container">
        {alianzas.map(({ nombre, url, imagen, descripcion }, index) => (
          <div className="flip-wrapper" key={index}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flip-card"
            >
              <div className="flip-front">
                <img src={imagen} alt={`Imagen de ${nombre}`} />
              </div>
              <div className="flip-back">
                <p className="font-semibold mb-2">{nombre}</p>
                <p className="text-sm">{descripcion}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarruselStaff;
