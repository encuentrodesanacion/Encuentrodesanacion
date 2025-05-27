import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tratamientoIntegral.css"; // Asegúrate que esta ruta sea correcta
import { useCart, Reserva } from "./CartContext"; // Importa 'Reserva' si aún no lo haces

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Componente para seleccionar fecha y hora antes de confirmar reserva
interface ReservaConFechaProps {
  terapia: string; // Nombre de la terapia seleccionada
  precio: number; // Precio de la terapia seleccionada
  onConfirm: (fechaHora: Date) => void;
}

function ReservaConFecha({ terapia, precio, onConfirm }: ReservaConFechaProps) {
  const [fechaHora, setFechaHora] = useState<Date | null>(null);

  const handleConfirm = () => {
    if (!fechaHora) {
      alert("Por favor, selecciona fecha y hora");
      return;
    }
    onConfirm(fechaHora);
  };

  return (
    <div className="reserva-fecha-container p-4 border rounded bg-white shadow-md max-w-xs mx-auto">
      <p>
        Reserva: <strong>{terapia}</strong> - ${precio.toLocaleString()} CLP
      </p>
      <DatePicker
        selected={fechaHora}
        onChange={(date: Date | null) => setFechaHora(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        dateFormat="dd/MM/yyyy HH:mm"
        minDate={new Date()}
        placeholderText="Selecciona fecha y hora"
        className="border p-2 w-full mt-2 mb-4"
      />
      <button
        onClick={handleConfirm}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full"
      >
        Confirmar Reserva
      </button>
    </div>
  );
}

// Interfaz para la reserva pendiente (lo que se guarda antes de elegir fecha/hora)
interface ReservaPendiente {
  terapia: string;
  precio: number;
  fechaHora?: Date; // Opcional, ya que se agrega más tarde
}

export default function SpaPrincipal() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [reservaPendiente, setReservaPendiente] =
    useState<ReservaPendiente | null>(null);

  // Tu lista de terapias
  const terapias = [
    {
      img: "../assets/creadorvirtual.jpg", // Asegúrate que estas rutas de imagen sean correctas
      title: "Canalización Energetica",
      terapeuta: "Disponible",
      description:
        "es una terapia en la cual una persona actúa como un conducto para recibir mensajes de guías espirituales...",
      precio: 55000, // Precio numérico
    },
    {
      img: "../assets/Terapeuta2.jpg",
      title: "Limpieza de Espacios",
      terapeuta: "Betsy Bolivar",
      description:
        "La limpieza energética de espacios es una práctica que busca eliminar energías negativas...",
      precio: 55000, // Precio numérico
    },
    {
      img: "../assets/Terapeuta3.jpg",
      title: "Liberación Memorias Uterinas",
      terapeuta: "Mónica García",
      description:
        "Es una terapia para conectar con nuestro Centro Creativo, el útero sagrado y liberar patrones...",
      precio: 55000, // Precio numérico
    },
    {
      img: "../assets/creadorvirtual.jpg", // Revisa si creadorvirtual es el mismo que el anterior
      title: "Constelaciones Familiares",
      terapeuta: "Paulina Villablanca",
      description:
        "Es una herramienta terapéutica para tratar conflictos personales, familiares y laborales...",
      precio: 55000, // Precio numérico
    },
    {
      img: "../assets/Terapeuta5.jpg",
      title: "Purificación y limpieza de energías negativas",
      terapeuta: "Sandra Da Silva",
      description:
        "¿Te sientes agotado/a sin mayor razón?... ¡Está es la Terapia adecuada para ti!",
      precio: 55000, // Precio numérico
    },
    {
      img: "../assets/creadorvirtual.jpg",
      title: "Péndulo Hebreo",
      terapeuta: "Rosa Santimone",
      description:
        "Es una terapia de armonización energética que permite detectar y eliminar energías negativas...",
      precio: 55000, // Precio numérico
    },
    {
      img: "../assets/Terapeuta8.jpg",
      title: "Lectura de Runas",
      terapeuta: "Ana Luisa Solvervicens",
      description:
        "Cuenta la leyenda que Odín, buscando la sabiduría, se sacrifica y de su sangre brotan las runas...",
      precio: 55000, // Precio numérico
    },
  ];

  // Mostrar formulario para seleccionar fecha y hora
  const reservar = (terapiaTitle: string, terapiaPrecio: number) => {
    // Asegúrate de que precio sea un número válido antes de guardar
    if (
      typeof terapiaPrecio !== "number" ||
      isNaN(terapiaPrecio) ||
      terapiaPrecio === null ||
      terapiaPrecio < 0
    ) {
      console.error("Error: Precio de la terapia inválido al reservar.");
      alert("No se puede reservar: el precio es inválido.");
      return;
    }
    setReservaPendiente({ terapia: terapiaTitle, precio: terapiaPrecio });
  };

  // Confirmar reserva y agregar al carrito
  const confirmarReserva = (fechaHora: Date) => {
    if (!reservaPendiente) return;

    // Construye el objeto 'reserva' con los tipos correctos y valores garantizados
    const reserva: Reserva = {
      servicio: reservaPendiente.terapia, // <-- ¡AHORA TOMA EL NOMBRE REAL DE LA TERAPIA!
      especialidad: reservaPendiente.terapia, // Podrías usar el mismo título como especialidad, o ajustarlo si tienes una especialidad real
      fecha: fechaHora.toISOString().split("T")[0],
      hora: fechaHora.toTimeString().split(" ")[0],
      precio: reservaPendiente.precio, // <-- ¡Precio ya verificado!
      // Añade cualquier otra propiedad obligatoria de 'Reserva' si no está aquí, como 'nombre', 'correo', etc.
      // O, asegúrate de que el modelo de backend permita null para ellas.
      // Ejemplo si son obligatorias pero no vienen de aquí:
      // nombre: "Cliente General",
      // correo: "cliente@ejemplo.com",
    };

    // --- CONSOLE.LOG PARA DEPURACIÓN ---
    console.log(
      "Objeto Reserva FINAL a añadir al carrito desde SpaPrincipal:",
      reserva
    );
    // --- FIN CONSOLE.LOG ---

    // Añade al carrito
    addToCart(reserva);

    alert(
      `Reserva agregada: ${reserva.servicio} el ${reserva.fecha} a las ${reserva.hora}`
    );

    setReservaPendiente(null); // Cierra el modal de fecha/hora
  };

  return (
    <div className="min-h-screen bg-white pt-24 px-6">
      {/* <header> y <CartIcon> u otros elementos de layout */}
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50 flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">Spa Principal</h1>
        {/* Asegúrate de que CartIcon se importe correctamente */}
        {/* <CartIcon /> */}
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
                  <h3 className="mb-2 font-bold">
                    {t.terapeuta !== "Disponible" && (
                      <span className="text-sm text-gray-600 block">
                        {t.terapeuta}
                      </span>
                    )}
                    {t.title}
                  </h3>
                  <p className="mb-2">{t.description}</p>
                  <form
                    className="w-full px-2"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <button
                      type="button"
                      onClick={() => reservar(t.title, t.precio)} // Pasar título y precio
                      className="w-full mt-4 px-2 py-2 border rounded bg-pink-600 text-white hover:bg-pink-700"
                    >
                      Toma de hora
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para seleccionar fecha y hora */}
      {reservaPendiente && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setReservaPendiente(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold"
            >
              X
            </button>
            <ReservaConFecha
              terapia={reservaPendiente.terapia}
              precio={reservaPendiente.precio}
              onConfirm={confirmarReserva}
            />
          </div>
        </div>
      )}
    </div>
  );
}
