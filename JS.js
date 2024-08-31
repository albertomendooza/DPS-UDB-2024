// Lista de productos con rutas de imágenes y cantidad disponible
const productos = [
    {
        id: 1,
        nombre: "Camiseta Blanca",
        precio: 150.00,
        cantidadDisponible: 10,
        imagen: "https://raw.githubusercontent.com/albertomendooza/https://github.com/albertomendooza/DPS-UDB-2024.git/main/imagen/1.jpg"
    },
    {
        id: 2,
        nombre: "Zapatos Deportivos",
        precio: 19.99,
        cantidadDisponible: 5,
        imagen: "https://raw.githubusercontent.com/albertomendooza/https://github.com/albertomendooza/DPS-UDB-2024.git/main/imagen/2.jpg"
    },
    {
        id: 3,
        nombre: "Mochila Escolar",
        precio: 79.99,
        cantidadDisponible: 7,
       imagen: "https://raw.githubusercontent.com/albertomendooza/https://github.com/albertomendooza/DPS-UDB-2024.git/main/imagen/3.jpg"
    },
    {
        id: 4,
        nombre: "Gafas de Sol",
        precio: 120.99,
        cantidadDisponible: 7,
        imagen: "https://raw.githubusercontent.com/albertomendooza/https://github.com/albertomendooza/DPS-UDB-2024.git/main/imagen/4.jpg"
    },
    {
        id: 5,
        nombre: "Reloj Deportivo",
        precio: 89.99,
        cantidadDisponible: 7,
       imagen: "https://raw.githubusercontent.com/albertomendooza/https://github.com/albertomendooza/DPS-UDB-2024.git/main/imagen/5.jpg"
    },
    {
        id: 6,
        nombre: "Auriculares Inalámbricos",
        precio: 59.99,
        cantidadDisponible: 7,
        imagen: "https://raw.githubusercontent.com/albertomendooza/https://github.com/albertomendooza/DPS-UDB-2024.git/main/imagen/6.jpg"
    },
    {
        id: 7,
        nombre: "Bolso de Mano",
        precio: 129.99,
        cantidadDisponible: 7,
        imagen: "https://raw.githubusercontent.com/albertomendooza/https://github.com/albertomendooza/DPS-UDB-2024.git/main/imagen/7.jpg"
    },
    {
        id: 8,
        nombre: "Producto 8",
        precio: 120.99,
        cantidadDisponible: 7,
        imagen: "https://raw.githubusercontent.com/albertomendooza/https://github.com/albertomendooza/DPS-UDB-2024.git/main/imagen/8.jpg"
    }
    
];

let carrito = [];

// Renderiza los productos en la página
function renderizarProductos() {
    const productList = document.getElementById('productos');
    productList.innerHTML = ''; // Limpiar la lista antes de agregar productos

    productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 producto';
        productCard.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio.toFixed(2)}</p>
                    <p class="card-text">Cantidad disponible: ${producto.cantidadDisponible}</p>
                    <input type="number" min="1" max="${producto.cantidadDisponible}" value="1" id="quantity-${producto.id}" class="form-control mb-2">
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Agrega un producto al carrito
function agregarAlCarrito(productId) {
    const producto = productos.find(p => p.id === productId);
    const cantidad = parseInt(document.getElementById(`quantity-${productId}`).value);

    if (cantidad > 0 && cantidad <= producto.cantidadDisponible) {
        const productoEnCarrito = carrito.find(p => p.id === productId);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
        } else {
            carrito.push({ ...producto, cantidad: cantidad });
        }

        producto.cantidadDisponible -= cantidad;
        actualizarCarrito();
    } else {
        alert("Cantidad no válida.");
    }
}

// Actualiza el carrito de compras
function actualizarCarrito() {
    const cartItems = document.getElementById('carrito');
    cartItems.innerHTML = '';
    let total = 0;

    carrito.forEach(producto => {
        const cartItem = document.createElement('li');
        cartItem.className = 'list-group-item cart-item';
        cartItem.innerHTML = `
            <span>${producto.nombre} - ${producto.cantidad} x $${producto.precio.toFixed(2)}</span>
            <span>$${(producto.precio * producto.cantidad).toFixed(2)}</span>
            <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        `;
        cartItems.appendChild(cartItem);

        total += producto.precio * producto.cantidad;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

// Elimina un producto del carrito
function eliminarDelCarrito(productId) {
    const producto = carrito.find(p => p.id === productId);
    const productoOriginal = productos.find(p => p.id === productId);
    productoOriginal.cantidadDisponible += producto.cantidad;
    
    carrito = carrito.filter(p => p.id !== productId);
    actualizarCarrito();
    renderizarProductos();
}


document.getElementById('pagar').addEventListener('click', function() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    alert('Pago realizado con éxito.');
    carrito = [];
    actualizarCarrito();
    renderizarProductos();
});


// Inicializa la tienda
renderizarProductos();
