const imagenes = [
  "/imagenes/terapia1.jpg",
  "/imagenes/terapia2.jpg",
  "/imagenes/terapia3.jpg",
  "/imagenes/terapia4.jpg",
  // Agrega más rutas según tus imágenes
];

const Galeria = () => {
  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-cyan-700 mb-10">
        Galería de Terapias
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {imagenes.map((src, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={src}
              alt={`Terapia ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galeria;
