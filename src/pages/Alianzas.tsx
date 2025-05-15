import { useNavigate } from "react-router-dom";
import CartIcon from "../components/CartIcon";
import { useCart } from "../pages/CartContext";
import { useState } from "react";

export default function Alianzas() {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useCart();

  const productos = [
    { id: 1, nombre: "Sierra", precio: 25, categoria: "Calzado" },
    { id: 2, nombre: "Pinzas", precio: 50, categoria: "Ropa" },
    { id: 3, nombre: "Tester", precio: 30, categoria: "Ropa" },
    { id: 4, nombre: "Scanner", precio: 20, categoria: "Accesorios" },
    { id: 5, nombre: "Camisa", precio: 40, categoria: "Ropa" },
    { id: 6, nombre: "Gorro", precio: 24, categoria: "Accesorios" },
    { id: 7, nombre: "Zapatilla nike", precio: 100, categoria: "Calzado" },
    { id: 8, nombre: "Zapatilla jordan", precio: 200, categoria: "Calzado" },
  ];

  const [categoriaFiltro, setCategoriaFiltro] = useState("Todos");
  const [precioMaximo, setPrecioMaximo] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);
  const [compraCompletada, setCompraCompletada] = useState(false);

  const [formulario, setFormulario] = useState({
    nombre: "",
    edad: "",
    email: "",
  });
  const [errorFormulario, setErrorFormulario] = useState("");

  const aplicarDescuento = () => {
    if (codigoDescuento === "ENCUENTRODESANACION10") {
      setDescuentoAplicado(0.1);
    } else {
      alert("Código de descuento inválido");
    }
  };

  const realizarPago = () => {
    if (!formulario.nombre || !formulario.edad || !formulario.email) {
      setErrorFormulario("Todos los campos son obligatorios.");
      return;
    }
    if (isNaN(Number(formulario.edad)) || Number(formulario.edad) < 18) {
      setErrorFormulario("Debes ser mayor de 18 años.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formulario.email)) {
      setErrorFormulario("Por favor ingresa un correo válido.");
      return;
    }

    setErrorFormulario("");
    alert("Pago completado con éxito");
    localStorage.removeItem("carrito");
    window.location.reload();
    setCompraCompletada(true);
  };

  const productosFiltrados = productos.filter((p) => {
    const porCategoria =
      categoriaFiltro === "Todos" || p.categoria === categoriaFiltro;
    const porPrecio =
      precioMaximo === "" || p.precio <= parseFloat(precioMaximo);
    const porNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return porCategoria && porPrecio && porNombre;
  });

  const totalCarrito = cart.reduce(
    (total, item) => total + item.precio * (item.cantidad || 1), // Usando un valor por defecto de 1
    0
  );

  const totalConDescuento = totalCarrito * (1 - descuentoAplicado);

  return (
    <div className="min-h-screen bg-white pt-24 px-6">
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50 flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">Alianzas</h1>
        <CartIcon />
      </header>

      <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
        Bienvenido a nuestras Alianzas
      </h2>
      <p className="text-gray-700 text-lg max-w-3xl mx-auto">
        Aquí podrás interactuar con nosotros y obtener beneficios
        espectaculares.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Volver al Inicio
      </button>

      <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <option value="Todos">Todas las categorías</option>
            <option value="Ropa">Ropa</option>
            <option value="Calzado">Calzado</option>
            <option value="Accesorios">Accesorios</option>
          </select>

          <input
            type="number"
            placeholder="Precio máximo"
            value={precioMaximo}
            onChange={(e) => setPrecioMaximo(e.target.value)}
          />
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {productosFiltrados.map((producto) => (
            <li
              key={producto.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p style={{ fontWeight: "bold" }}>{producto.nombre}</p>
                <p>${producto.precio}</p>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                  {producto.categoria}
                </p>
              </div>
              <button
                onClick={() => addToCart({ ...producto, cantidad: 1 })}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  border: "none",
                }}
              >
                Agregar al carrito
              </button>
            </li>
          ))}
        </ul>

        {cart.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h2>Resumen del Carrito:</h2>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.nombre} - ${item.precio} x{" "}
                  {item.cantidad !== undefined ? item.cantidad : 1}
                  <button
                    onClick={() => removeFromCart(index)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      marginLeft: "1rem",
                    }}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "1rem" }}>
              <input
                type="text"
                placeholder="Código de descuento"
                value={codigoDescuento}
                onChange={(e) => setCodigoDescuento(e.target.value)}
              />
              <button onClick={aplicarDescuento}>Aplicar Descuento</button>
            </div>

            <p style={{ fontWeight: "bold" }}>
              Total: ${totalConDescuento.toFixed(2)}
            </p>

            <h3>Formulario de Registro</h3>
            {errorFormulario && (
              <p style={{ color: "red" }}>{errorFormulario}</p>
            )}
            <input
              type="text"
              placeholder="Nombre"
              value={formulario.nombre}
              onChange={(e) =>
                setFormulario({ ...formulario, nombre: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Edad"
              value={formulario.edad}
              onChange={(e) =>
                setFormulario({ ...formulario, edad: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={formulario.email}
              onChange={(e) =>
                setFormulario({ ...formulario, email: e.target.value })
              }
            />

            <button onClick={realizarPago}>Completar compra</button>
          </div>
        )}

        {compraCompletada && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <h3>¡Gracias por tu compra!</h3>
            <p>Tu carrito ha sido vaciado y el pago ha sido procesado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
