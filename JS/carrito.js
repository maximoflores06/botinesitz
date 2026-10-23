
const ventanaCarrito = document.querySelector("#ventanaCarrito");
const listaCarrito = document.querySelector("#listaCarrito");
const totalCarrito = document.querySelector("#totalCarrito");
const cantidadCarrito = document.querySelector("#cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carritoBotines")) || [];

function guardarCarrito() {
    localStorage.setItem("carritoBotines", JSON.stringify(carrito));
}

document.addEventListener("click", function(e) {
    const botonAgregar = e.target.closest(".btn-carrito");

    if (botonAgregar) {
        const id = botonAgregar.dataset.id;
        const imagen = botonAgregar.dataset.imagen;
        const nombre = botonAgregar.dataset.nombre;
        const precio = Number(botonAgregar.dataset.precio);

        const encontrado = carrito.find(p => p.id === id);

        if (encontrado) {
            encontrado.cantidad++;
        } else {
            carrito.push({
                id: id,
                imagen: imagen,
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });
        }

        guardarCarrito();
        mostrarCarrito();
    }

    const botonQuitar = e.target.closest(".btn-quitar");

    if (botonQuitar) {
        const id = botonQuitar.dataset.id;

        carrito = carrito.filter(p => p.id !== id);

        guardarCarrito();
        mostrarCarrito();
    }
});

function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    let total = 0;
    let cantidad = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;
        cantidad += producto.cantidad;

        listaCarrito.innerHTML += `
            <article class="producto-carrito">
                <h3>${producto.nombre}</h3>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>Precio: $${producto.precio.toLocaleString("es-AR")}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Subtotal: $${subtotal.toLocaleString("es-AR")}</p>

                <button class="btn-quitar" data-id="${producto.id}">
                    Quitar
                </button>
            </article>
        `;
    });

    if (carrito.length === 0) {
        listaCarrito.textContent = "Tu carrito está vacío.";
    }

    totalCarrito.textContent = total.toLocaleString("es-AR");
    cantidadCarrito.textContent = cantidad;
}

document.querySelector("#abrirCarrito").addEventListener("click", function() {
    ventanaCarrito.showModal();
});

document.querySelector("#cerrarCarrito").addEventListener("click", function() {
    ventanaCarrito.close();
});

document.querySelector("#vaciarCarrito").addEventListener("click", function() {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
});

mostrarCarrito();


document.querySelector("#comprarCarrito").addEventListener("click", function() {

    if (carrito.length === 0) {
        ventanaCarrito.close();

        Swal.fire({
            title: "Carrito vacío",
            text: "Agregá algún modelo de botin antes de comprar.",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });

        return;
    }

    const total = totalCarrito.textContent;

    ventanaCarrito.close();

    Swal.fire({
        title: "¡Compra Realizada!",
        text: "Tu total es de $" + total,
        icon: "success",
        confirmButtonText: "Aceptar"
    });

    carrito = [];
    guardarCarrito();
    mostrarCarrito();

});

mostrarCarrito();