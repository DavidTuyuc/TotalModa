// --- Productos ---
const productos = [
  { id: 1, nombre: "Camisa Casual Hombre", precio: 120, img: "images/camisa.png" },
  { id: 2, nombre: "Vestido Elegante Mujer", precio: 200, img: "images/vestido.png" },
  { id: 3, nombre: "Jeans Azul Unisex", precio: 150, img: "images/pantalon.png" },
  { id: 4, nombre: "Chaqueta Deportiva", precio: 180, img: "images/chaqueta.png" },
  { id: 5, nombre: "Sombrero Estilo Verano", precio: 90, img: "images/sombrero.png" },
  { id: 6, nombre: "Blusa Floral Mujer", precio: 130, img: "images/blusa.png" },
  { id: 7, nombre: "Suéter Clásico Hombre", precio: 160, img: "images/sueter.png" },
  { id: 8, nombre: "Hoodie Unisex", precio: 170, img: "images/hoodie.png" },
  { id: 9, nombre: "Zapatos de Tacón Mujer", precio: 220, img: "images/zapatos.png" },
  { id: 10, nombre: "Camiseta Infantil", precio: 100, img: "images/camisainfantil.png" }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// --- Mostrar productos en index ---
const contenedor = document.querySelector(".productos");
if (contenedor) {
  productos.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>Precio: Q${p.precio}</p>
      <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito ");
}

// --- Registro ---
const form = document.getElementById("formRegistro");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;
    const mensaje = document.getElementById("mensaje");

    if (usuario === "alumno" && contraseña === "2025") {
      mensaje.textContent = "Acceso correcto. Bienvenido a ModaTotal ";
      mensaje.style.color = "green";
      setTimeout(() => window.location.href = "index.html", 1000);
    } else {
      mensaje.textContent = "Usuario o contraseña incorrectos ";
      mensaje.style.color = "red";
    }
  });
}

// --- Carrito ---
const tablaCarrito = document.querySelector("#tablaCarrito tbody");
if (tablaCarrito) {
  carrito.forEach(item => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td>Q${item.precio}</td>
      <td>${item.cantidad}</td>
      <td>Q${item.precio * item.cantidad}</td>
    `;
    tablaCarrito.appendChild(fila);
  });

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  document.getElementById("totalCompra").textContent = `Total: Q${total}`;
}

const btnFinalizar = document.getElementById("btnFinalizar");
if (btnFinalizar) {
  btnFinalizar.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    document.getElementById("mensajeFinal").textContent =
      "Compra finalizada con éxito. ¡Gracias por tu compra!";
    document.getElementById("tablaCarrito").innerHTML = "";
    document.getElementById("totalCompra").textContent = "Total: Q0.00";
  });
}
