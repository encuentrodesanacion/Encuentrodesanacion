import { useEffect, useState, forwardRef, ForwardedRef } from "react";

interface ReservaHoraProps {
  servicioSeleccionado?: string;
  especialidadSeleccionada?: string;
}

const HorasTL = forwardRef<HTMLDivElement, ReservaHoraProps>(
  ({ servicioSeleccionado }, ref) => {
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");

    const horasDisponibles = ["10:00", "11:00", "12:00", "13:00"];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      alert("Reserva realizada con éxito");
    };

    return (
      <section ref={ref} className="p-4 bg-white shadow-md rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
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
              disabled={servicioSeleccionado === "Terapeutas de la luz"}
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
              disabled={servicioSeleccionado === "Terapeutas de la luz"}
            >
              <option value="">Selecciona una hora</option>
              {horasDisponibles.map((h, index) => (
                <option key={index} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition"
          >
            Confirmar Reserva
          </button>
        </form>
      </section>
    );
  }
);

export default HorasTL;
