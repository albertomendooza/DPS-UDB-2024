// Lista de productos con rutas de imágenes y cantidad disponible
const productos = [
    {
        id: 1,
        nombre: "Apple Mac",
        precio: 1499.99,
        cantidadDisponible: 10,
        imagen: "https://raw.githubusercontent.com/albertomendooza/DPS-UDB-2024/main/img/1.webp"
    },
    {
        id: 2,
        nombre: "Apple iPhone",
        precio: 1259.99,
        cantidadDisponible: 5,
        imagen: "https://raw.githubusercontent.com/albertomendooza/DPS-UDB-2024/main/img/2.jpeg"
    },
    {
        id: 3,
        nombre: "Cámara Sony",
        precio: 89.99,
        cantidadDisponible: 7,
       imagen: "https://raw.githubusercontent.com/albertomendooza/DPS-UDB-2024/main/img/3.jpeg"
    },
    {
        id: 4,
        nombre: "Apple iPad",
        precio: 890.99,
        cantidadDisponible: 7,
        imagen: "https://raw.githubusercontent.com/albertomendooza/DPS-UDB-2024/main/img/4.jpg"
    },
    {
        id: 5,
        nombre: "Audífonos Sony",
        precio: 189.99,
        cantidadDisponible: 7,
       imagen: "https://raw.githubusercontent.com/albertomendooza/DPS-UDB-2024/main/img/5.jpeg"
    },
    {
        id: 6,
        nombre: "Samsung Galaxy S24 Ultra",
        precio: 1249.99,
        cantidadDisponible: 7,
        imagen: "https://raw.githubusercontent.com/albertomendooza/DPS-UDB-2024/main/img/6.webp"
    },
    {
        id: 7,
        nombre: "Samsung Galaxy Z Flip5",
        precio: 849.99,
        cantidadDisponible: 7,
        imagen: "https://raw.githubusercontent.com/albertomendooza/DPS-UDB-2024/main/img/7.webp"
    },
    {
        id: 8,
        nombre: "Samsung Galaxy S23 FE",
        precio: 520.99,
        cantidadDisponible: 7,
        imagen: "https://raw.githubusercontent.com/albertomendooza/DPS-UDB-2024/main/img/8.jpeg"
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
