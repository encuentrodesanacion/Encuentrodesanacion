import { useState, useRef, ForwardedRef, forwardRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Instagram,
  Facebook,
  Youtube,
  Earth,
  Heart,
  SmilePlus,
  Brain,
  Star,
  Orbit,
} from "lucide-react";
// import ReservaHora from "../ReservaHora";

import encuentroImage from "../assets/Encuentrodesanacion.jpeg";
import { Link } from "react-router-dom";
import CartIcon from "../components/CartIcon";
import TratamientoHolistico from "./TratamientoIntegral";
const App = () => {
  const reservaRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // menú mobile
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-purple-600/95 fixed w-full z-10 border-b border-pastel-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo o Título */}
            <div className="flex items-center">
              <span className="text-2xl font-light text-white">
                <div>
                  <span className="text-bisque-200 font-bold">
                    SPA HOLÍSTICO{" "}
                  </span>
                  <span className="text-cyan-400 font-bold">ONLINE</span>
                </div>
              </span>
            </div>

            {/* Menú de escritorio */}
            <div className="hidden md:flex items-center justify-start gap-6 p-4 pl-2">
              <a
                href="#inicio"
                className="text-blue-300 hover:text-white font-bold"
              >
                Inicio
              </a>
              <a
                href="#servicios"
                className="text-blue-300 hover:text-white font-bold"
              >
                Servicios
              </a>
              <a
                href="#otros"
                className="text-blue-300 hover:text-white font-bold"
              >
                Otros
              </a>
              <a
                href="#contacto"
                className="text-blue-300 hover:text-white font-bold"
              >
                Contacto
              </a>
            </div>

            {/* Menú móvil + Cart Icon */}
            <div className="flex items-center gap-1 mr-auto">
              <CartIcon />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white/70 hover:text-pastel-green"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-black/95 to-black/90 border-t border-pastel-green/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#inicio"
                className="block px-3 py-2 text-white/70 hover:text-pastel-green"
              >
                Inicio
              </a>
              <a
                href="#servicios"
                className="block px-3 py-2 text-white/70 hover:text-pastel-green"
              >
                Servicios
              </a>
              <a
                href="#otros"
                className="block px-3 py-2 text-white/70 hover:text-pastel-green"
              >
                Otros
              </a>
              <a
                href="#contacto"
                className="block px-3 py-2 text-white/70 hover:text-pastel-green"
              >
                Contacto
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="inicio"
        className="pt-20 pb-12 md:pt-32 md:pb-24 bg-gradient-to-r from-pastel-green/20 to-pastel-mint/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-500 mb-6">
                Encuentro de Sanación{"                                 "}
              </h1>

              <p className="text-lg text-gray-600 mb-8">
                Bienvenidos al Primer Spa Holístico Online. De Chile para el
                Mundo. Aquí encontrarás a los mejores especialistas Holísticos
                quienes te ayudarán a avanzar en tu proceso de Sanación, ya sea
                emocional, física, mental y/o espiritual.
              </p>
            </div>
            <div className="relative">
              <img
                src={encuentroImage}
                alt="Encuentro de sanación"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-pastel-green/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section
        id="servicios"
        className="py-16 md:py-24 bg-gradient-to-r from-fuchsia-200 to-pink-600 text-white font-bold"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="md:text-5xl font-light text-center mb-12 text-cyan-300/95 font-bold">
            Servicios Principales
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-8 h-8 mb-4 text-yellow-500" />,
                title:
                  "Formación de Terapeutas de la Luz (Con mención en diferentes áreas seleccionadas)",
                description:
                  "Espacio enfocado en tu Formación como Terapeuta. Queremos que alcances tu mejor potencial de la mano de los terapeutas más destacados.",
                price: "Desde $20.000CLP / €30 / 33USD por sesión",
                button: (
                  <div className="flex flex-col gap-2 mt-4">
                    <a
                      href="#reserva"
                      onClick={() => {
                        setServicioSeleccionado("Terapeutas de la luz");
                        setEspecialidadSeleccionada("");
                      }}
                    ></a>
                    <Link
                      to="/terapeutasdeluz"
                      className="mt-2 px-3 py-1 bg-cyan-600 text-white text-sm rounded hover:bg-cyan-700"
                    >
                      Ver más detalles
                    </Link>
                  </div>
                ),
              },
              {
                icon: <Heart className="w-8 h-8 mb-4 text-yellow-500" />,
                title: "Tratamiento Integral",
                description:
                  "Pack de sesiones para avanzar en tu proceso de sanación física, mental, emocional y/o espiritual.",
                price: "Desde 33.000CLP / €43 / 45USD",
                button: (
                  <div className="flex flex-col gap-2 mt-4">
                    <Link
                      to="/tratamientointegral"
                      className="mt-2 px-3 py-1 bg-cyan-600 text-white text-sm rounded hover:bg-cyan-700"
                    >
                      Ver más detalles
                    </Link>
                  </div>
                ),
              },

              {
                icon: <SmilePlus className="w-8 h-8 mb-4 text-yellow-500" />,
                title:
                  "Programa Terapeutico para empresas/Colectivo de personas (Desde 8 personas)",
                description:
                  "Programa enfocado en lograr un bienestar Físico, Mental y/o Emocional. Utilizando diversas técnicas Holísticas para generar índices más altos de productividad y rendimiento.",
                price:
                  "Este servicio es especial y puede variar según tus necesidades.",
                button: (
                  <a
                    href="mailto:evaldesnew@gmail.com?subject=Consulta&body=Hola,%20me%20gustaría%20saber%20más%20sobre..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-cyan-400/60 text-black font-medium rounded-full hover:bg-pastel-green/80 transition"
                  >
                    Contáctanos
                  </a>
                ),
              },
              {
                icon: <Earth className="w-8 h-8 mb-4 text-yellow-500" />,
                title: "Spa Holístico al Mundo",
                description:
                  "Aprende a manejar tu propio Spa Holístico para poder expandir la Sanación en tu país. (excluye Chile)",
                price: "Desde los €150 / $163USD",
                button: (
                  <a
                    href="mailto:evaldesnew@gmail.com?subject=Consulta&body=Hola,%20me%20gustaría%20saber%20más%20sobre..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-cyan-400/60 text-black font-medium rounded-full hover:bg-pastel-green/80 transition"
                  >
                    Contáctanos
                  </a>
                ),
              },
              {
                icon: <Brain className="w-8 h-8 mb-4 text-yellow-500" />,
                title: "Talleres Mensuales",
                description:
                  "Encuentros grupales para reconectar con tu esencia, liberar bloqueos y activar tu energía interior. (Yoga, Yoga Infantil, Pilates, etc.)",
                price: "Desde 33.000CLP / €43 / $45USD,",
                button: (
                  <a
                    href="#reserva"
                    className="inline-block mt-4 px-4 py-2 bg-cyan-400/60 text-black font-medium rounded-full hover:bg-pastel-green/80 transition"
                    onClick={() => {
                      setServicioSeleccionado("Talleres Mensuales");
                      setEspecialidadSeleccionada("");
                    }}
                  >
                    Reserva tu cupo
                  </a>
                ),
              },
              {
                icon: <Orbit className="w-8 h-8 mb-4 text-yellow-500" />,
                title: "Alianzas",
                description:
                  "Adquiere tus descuentos con nuestras diferentes alianzas para avanzar aun mas en tu proceso de sanación",
                price: "Desde 7.000CLP / €17 / 19USD",
                button: (
                  <div className="flex flex-col gap-2 mt-4">
                    <Link
                      to="/alianzas"
                      className="mt-2 px-3 py-1 bg-cyan-600 text-white text-sm rounded hover:bg-cyan-700"
                    >
                      Ver más detalles
                    </Link>
                  </div>
                ),
              },
            ].map((service, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-2xl">
                {service.icon}
                <h3 className="text-xl font-light mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <p className="text-pastel-green font-light">{service.price}</p>
                {service.button && service.button}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Componente ReservaHora agregado aquí abajo */}

      {/* Blog Preview Section */}
      {/* Blog Preview Section */}
      <section
        id="otros"
        className="py-0 bg-gradient-to-r from-pastel-green to-pastel-mint/10"
      >
        <div className=" bg-gradient-to-r from-fuchsia-200 to-pink-600 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl text-yellow-400 text-center  py-25 md:py-12 font-bold">
            Dias de Ofrenda
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Forma parte de nuestro STAFF",
                image:
                  "https://www.cipmex.org/wp-content/uploads/2019/05/27-1.jpg",
                excerpt:
                  "¿Sientes el llamado de compartir tu medicina con el mundo? Postula para ser parte de nuestra comunidad de terapeutas y facilita tu don a quienes lo necesitan desde el corazón.",
                buttonText: "Quiero ser parte del STAFF",
              },

              {
                title: "SPA PRINCIPAL",
                image:
                  "https://psicoandres.cl/wp-content/uploads/2023/04/enfoque-holistico.jpg",
                excerpt:
                  "Un espacio para terapeutas consolidados que desean ofrecer sus servicios en jornadas especiales de 5 días, con enfoque en bienestar integral y sanación consciente.",
                buttonText: "Postula al Spa Principal",
              },
              {
                title: "SPA LITTLE",
                image:
                  "https://soyuzbilingual.edu.pa/wp-content/uploads/2022/01/aprendizaje-holistico.jpg",
                excerpt:
                  "Dedicado a terapeutas en formación o en sus primeras experiencias. Un entorno seguro para comenzar a compartir tus terapias durante 3 días al mes.",
                buttonText: "Reserva tu hora",
              },
            ].map((post, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-light mb-2">{post.title}</h3>
                  <p className="text-gray-600">{post.excerpt}</p>
                  <a
                    href="#contacto" // puedes cambiar esto a un enlace real o mailto
                    className="text-black hover:text-pastel-green mt-4 inline-block font-medium"
                  >
                    {post.buttonText} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contacto" className="py-16 md:py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-light mb-6">
                Comienza Tu Viaje
              </h2>
              <p className="text-gray-400 mb-8">
                Da el primer paso hacia una vida más consciente y equilibrada.
                Agenda tu consulta inicial gratuita.
              </p>
              <div className="space-y-4">
                <p className="flex items-center text-gray-400">
                  <span className="font-light mr-2">Email:</span>
                  contacto@holisticbalance.com
                </p>
                <p className="flex items-center text-gray-400">
                  <span className="font-light mr-2">Teléfono:</span>
                  +569 7655 7902
                </p>
                <div className="flex space-x-4 mt-6">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-pastel-green transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-pastel-green transition-colors"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-pastel-green transition-colors"
                  >
                    <Youtube size={24} />
                  </a>
                </div>
              </div>
            </div>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-light text-gray-300"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-lg bg-white-900 border-gray-800 text-white focus:ring-pastel-green focus:border-pastel-green"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-light text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-lg bg-white-900 border-gray-800 text-white focus:ring-pastel-green focus:border-pastel-green"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-light text-gray-300"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-lg bg-white-900 border-gray-800 text-white focus:ring-pastel-green focus:border-pastel-green"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-pastel-green text-black px-6 py-3 rounded-full hover:bg-pastel-green/90 transition-colors"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gradient-to-b from-black to-black/95 text-white py-12 border-t border-pastel-green/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-light mb-4">
                <span className="text-pastel-green">Encuentro de</span> Sanación
              </h3>
              <p className="text-gray-400">
                Transformando vidas a través del equilibrio holístico y el
                bienestar integral.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-light mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#inicio"
                    className="text-gray-400 hover:text-pastel-green transition-colors"
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="text-gray-400 hover:text-pastel-green transition-colors"
                  >
                    Servicios
                  </a>
                </li>
                <li>
                  <a
                    href="#otros"
                    className="text-gray-400 hover:text-pastel-green transition-colors"
                  >
                    otros
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-light mb-4">Sígueme</h3>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/encuentrodesanacion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pastel-green transition-colors"
                >
                  <Instagram size={24} /> <h1>Encuentro de Sanación</h1>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Encuentro de Sanación. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
