const formulario = document. getElementById("formularioBotines")
const botines = document. getElementById("idBotines")
const resultado = document.getElementById("resultado")

formulario.addEventListener("submit", BuscarBotin);

async function BuscarBotin(e) {

      e.preventDefault ();

      const nombre = botines.value.toLowerCase();

    try {
      const respuesta = await fetch("../data/productos.json");
      if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los productos");
        }
        const botin = await respuesta.json();

    const producto = botin.find(
    producto => producto.nombre.toLowerCase() === nombre)

    if (!producto) {
      throw new Error("Botin no encontrado");


    }

  

       resultado.innerHTML = `
    <article class = "cardBotin">
        <img src=${producto.imagen}>
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}</p>
        <button class="btn-carrito" data-id="${producto.id}"
            data-imagen="${producto.imagen}"
            data-nombre="${producto.nombre}"
            data-precio="${producto.precio}"">Agregar al Carrito</button>
        <article>`;

          }
           catch (error) {

             console.error(error);
            
      resultado.innerHTML = `
        <article class = "cardBotinerror">
        <p>TU MODELO NO ESTÁ EN STOCK<p>
        <article>`;
         } } 

async function cargarProductosDesdeJSON() {
  try {
    const respuesta = await fetch("../data/productos.json"); 
    
    if (!respuesta.ok) {
      throw new Error(`Error en la carga: ${respuesta.status}`);
    }
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error("Hubo un problema al cargar el JSON:", error);
    return [];
  }
}

const contenedor = document.getElementById("contenedor-productos");

async function cargarProductosDesdeJSON () {
    try {
        const respuesta = await fetch("../data/productos.json");
        const productos = await respuesta.json();
        productos.forEach(producto => {
        contenedor.innerHTML += `
        <article class="cards">
        <img src=${producto.imagen}>
        <h3>${producto.nombre}</h3>
        <p>Precio: $ ${producto.precio}</p>
        <button class="btn-carrito" data-id="${producto.id}"
            data-imagen="${producto.imagen}"
            data-nombre="${producto.nombre}"
            data-precio="${producto.precio}">Agregar al Carrito</button>
        <article>`;
    })

    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}
cargarProductosDesdeJSON()

document.addEventListener("click", (e) => {
    const btnCarrito = e.target.closest(".btn-carrito");

    if (!btnCarrito) return;

    Toastify({
        text: "Producto agregado al Carrito",
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
            background: "#ff3939",
            borderRadius: "10px",
            color: "#ffffff"
        }
    }).showToast();
});


