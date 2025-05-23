import { useEffect, useState, forwardRef, ForwardedRef } from "react";
import { useCart } from "../pages/CartContext"; // 👈 Asegúrate que esta ruta sea correcta

interface ReservaHoraProps {
  servicioSeleccionado?: string;
  especialidadSeleccionada?: string;
}

// El componente debe envolver la función con forwardRef correctamente
const ReservaHora = forwardRef<HTMLDivElement, ReservaHoraProps>(
  (
    { servicioSeleccionado, especialidadSeleccionada },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [servicio, setServicio] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [precio, setPrecio] = useState<number>(0);
    const [sesiones, setSesiones] = useState<number>(1);

    const { addToCart } = useCart(); // 👈 Traemos el método del carrito

    useEffect(() => {
      if (servicioSeleccionado) setServicio(servicioSeleccionado);
      if (especialidadSeleccionada) setEspecialidad(especialidadSeleccionada);
      // Si el servicio seleccionado es "Formación de Terapeutas de la Luz", se debe dejar el input de hora nulo
      if (servicioSeleccionado === "Terapeutas de la luz") {
        setHora(""); // Deja el valor de hora en vacío
      }
    }, [servicioSeleccionado, especialidadSeleccionada]);

    const servicios = [
      "Finde talleres y terapias grupales",
      "Tratamiento Holístico",
      "Spa Principal",
      "Terapeutas de la luz",
      "Talleres Mensuales",
    ];
    const especialidades = [
      "Regresiones",
      "Tarot",
      "Terapia Respuesta Espiritual (TRE)",
      "Tameana",
      "Péndulo Hebreo",
      "Cruz de Anhk",
      "Carta Natal",
      "Clarividencia",
      "Registros Akáshicos",
      "Liberación Emociones Atrapadas",
      "Lectura de Runas",
      "Lectura de Oráculos",
      "Constelaciones Familiares",
    ];
    const horasDisponibles = ["10:00", "11:00", "12:00", "13:00"];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // 👇 Creamos el objeto de reserva
      const reserva = {
        servicio,
        especialidad,
        fecha,
        hora,
        nombre,
        correo,
        precio,
        sesiones,
      };

      // 👇 Lo añadimos al carrito
      addToCart(reserva);

      alert("Reserva añadida al carrito con éxito");
      // Aquí podrías redirigir al carrito o página de pago si quieres
    };

    // Limitar las especialidades dependiendo del servicio
    const obtenerEspecialidadesDisponibles = () => {
      if (servicio === "Finde de talleres y terapias grupales") {
        return especialidades.filter((esp) => esp !== "Tarot"); // Excluir Tarot en este caso
      }
      return especialidades; // Mostrar todas las especialidades si no hay restricción
    };

    return (
      <section
        id="reserva"
        ref={ref}
        className="bg-gradient-to-r from-fuchsia-200 to-pink-600 py-2 px-10 max-w mx-auto shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-cyan-700 mb-6">
          Reserva tu Hora
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="servicio"
              className="block text-sm font-medium text-gray-700"
            >
              Servicio
            </label>
            <select
              id="servicio"
              name="servicio"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Selecciona un servicio</option>
              {servicios.map((srv, index) => (
                <option key={index} value={srv}>
                  {srv}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="especialidad"
              className="block text-sm font-medium text-gray-700"
            >
              Especialidad
            </label>
            <select
              id="especialidad"
              name="especialidad"
              value={especialidad}
              onChange={(e) => setEspecialidad(e.target.value)}
              required
              disabled={!servicio}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">Selecciona una especialidad</option>
              {obtenerEspecialidadesDisponibles().map((esp, index) => (
                <option key={index} value={esp}>
                  {esp}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="fecha"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              disabled={servicio === "Terapeutas de la luz"}
            />
          </div>

          <div>
            <label
              htmlFor="hora"
              className="block text-sm font-medium text-gray-700"
            >
              Hora
            </label>
            <select
              id="hora"
              name="hora"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              disabled={servicio === "Terapeutas de la luz"} // Desactiva el input de hora si el servicio es "Formación de Terapeutas de la Luz"
            >
              <option value="">Selecciona una hora</option>
              {horasDisponibles.map((h, index) => (
                <option key={index} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label
              htmlFor="correo"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Confirmar Reserva
          </button>
        </form>
      </section>
    );
  }
);

export default ReservaHora as React.ForwardRefExoticComponent<
  ReservaHoraProps & React.RefAttributes<HTMLDivElement>
>;
