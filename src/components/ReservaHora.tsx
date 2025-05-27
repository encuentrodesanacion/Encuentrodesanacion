import React, { useState, useEffect, forwardRef, ForwardedRef } from "react";
import { useCart, Reserva } from "../pages/CartContext"; // Asegúrate que esta ruta sea correcta

interface ReservaHoraProps {
  servicioSeleccionado?: string;
  especialidadSeleccionada?: string;
}

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
    const [precio, setPrecio] = useState<number>(0); // Inicializado como 0
    const [sesiones, setSesiones] = useState<number>(1);

    const { addToCart } = useCart(); // Traemos el método del carrito

    useEffect(() => {
      if (servicioSeleccionado) setServicio(servicioSeleccionado);
      if (especialidadSeleccionada) setEspecialidad(especialidadSeleccionada);

      // Si el servicio seleccionado es "Terapeutas de la luz", se debe dejar el input de hora nulo
      // y quizás ajustar el precio si este servicio es diferente
      if (servicioSeleccionado === "Terapeutas de la luz") {
        setHora(""); // Deja el valor de hora en vacío
        // Ejemplo: Si "Terapeutas de la luz" tiene un precio diferente
        // setPrecio(X);
      }
      // Actualiza el precio si el servicio o especialidad cambian y tienen precios asociados
      // Esto es crucial si el precio NO es fijo en 30000 para todos los servicios/especialidades
      // Por ejemplo, podrías tener un objeto de precios:
      // const precios = {
      //   "Finde talleres y terapias grupales": 50000,
      //   "Tratamiento Holístico": 45000,
      //   "Spa Principal": 25000,
      //   "Terapeutas de la luz": 30000, // Tu precio actual
      //   "Talleres Mensuales": 15000,
      // };
      // if (servicioSeleccionado && precios[servicioSeleccionado]) {
      //   setPrecio(precios[servicioSeleccionado]);
      // }
    }, [servicioSeleccionado, especialidadSeleccionada]); // Asegúrate de que todas las dependencias estén aquí

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

      // --- VALIDACIONES CRUCIALES ANTES DE CREAR LA RESERVA ---
      // Asegúrate de que el servicio y precio tengan valores válidos
      if (!servicio || servicio.trim() === "") {
        alert("Por favor, selecciona un servicio.");
        return;
      }
      if (
        precio === null ||
        precio === undefined ||
        isNaN(precio) ||
        precio <= 0
      ) {
        alert("Por favor, introduce un precio válido para la reserva.");
        return;
      }
      // Si el servicio es "Terapeutas de la luz", no se requiere hora ni fecha
      if (servicio !== "Terapeutas de la luz") {
        if (!fecha) {
          alert("Por favor, selecciona una fecha para la reserva.");
          return;
        }
        if (!hora) {
          alert("Por favor, selecciona una hora para la reserva.");
          return;
        }
      }
      if (!nombre || nombre.trim() === "") {
        alert("Por favor, introduce tu nombre.");
        return;
      }
      if (!correo || correo.trim() === "") {
        alert("Por favor, introduce tu correo electrónico.");
        return;
      }
      // --- FIN VALIDACIONES ---

      // Creamos el objeto de reserva
      const reserva: Reserva = {
        // Tipamos el objeto explícitamente
        servicio: servicio,
        especialidad: especialidad,
        fecha: fecha,
        hora: hora,
        nombre: nombre,
        correo: correo,
        precio: precio,
        sesiones: sesiones, // Si sesiones es relevante para el precio
      };

      // --- CONSOLE.LOG PARA DEPURACIÓN ---
      console.log(
        "Objeto Reserva a añadir al carrito desde ReservaHora:",
        reserva
      );
      // --- FIN CONSOLE.LOG ---

      // Lo añadimos al carrito
      addToCart(reserva);

      alert("Reserva añadida al carrito con éxito");

      // Reiniciar el formulario después de añadir al carrito
      setServicio(servicioSeleccionado || ""); // Restablece a la prop o vacío
      setEspecialidad(especialidadSeleccionada || ""); // Restablece a la prop o vacío
      setFecha("");
      setHora("");
      setNombre("");
      setCorreo("");
      setPrecio(30000); // Restablece el precio a un valor por defecto o real
      setSesiones(1);

      // Si también estás enviando a la API de 'enviar-reserva' aquí, asegúrate de que 'precio' y 'servicio' estén correctos
      fetch("http://localhost:3000/api/enviar-reserva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          servicio: reserva.servicio,
          especialidad: reserva.especialidad,
          fecha: reserva.fecha,
          hora: reserva.hora,
          precio: reserva.precio,
          nombre: reserva.nombre, // Asegúrate de enviar también nombre y correo si tu API lo necesita
          correo: reserva.correo,
          sesiones: reserva.sesiones,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error al enviar la reserva");
          }
          return res.text();
        })
        .then((mensaje) => {
          console.log(
            "✅ Reserva enviada al backend (solo notificación):",
            mensaje
          );
        })
        .catch((error) => {
          console.error(
            "❌ Error al enviar reserva al backend (solo notificación):",
            error
          );
        });
    };

    // Limitar las especialidades dependiendo del servicio
    const obtenerEspecialidadesDisponibles = () => {
      if (servicio === "Finde talleres y terapias grupales") {
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
              required={servicio !== "Terapeutas de la luz"} // Hace que sea requerido solo si no es "Terapeutas de la luz"
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
              required={servicio !== "Terapeutas de la luz"} // Hace que sea requerido solo si no es "Terapeutas de la luz"
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

          {/* Campo de Nombre */}
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

          {/* Campo de Correo Electrónico */}
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

          {/* Campo de Precio - Aquí podrías tener un input si el precio es variable, o si lo fijas por lógica */}
          {/* Si el precio no es fijo, podrías añadir un input numérico y actualizar el estado `precio` */}
          {/* <input type="number" value={precio} onChange={(e) => setPrecio(Number(e.target.value))} /> */}

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
