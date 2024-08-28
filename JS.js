// Lista de productos con rutas de imágenes y cantidad disponible
const productos = [
    {
        id: 1,
        nombre: "Producto 1",
        precio: 150.00,
        cantidadDisponible: 10,
        imagen: "images/Producto 1.jpg"
    },
    {
        id: 2,
        nombre: "Producto 2",
        precio: 19.99,
        cantidadDisponible: 5,
        imagen: "images/Producto 2.jpg"
    },
    {
        id: 3,
        nombre: "Producto 3",
        precio: 79.99,
        cantidadDisponible: 7,
        imagen: "images/Producto 3.jpg"
    }
];

let carrito = [];

// Renderiza los productos en la página
function renderizarProductos() {
    const productList = document.getElementById('product-list');
    productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 product';
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
    const cartItems = document.getElementById('cart-items');
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

    document.getElementById('cart-total').textContent = total.toFixed(2);
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

// Finaliza la compra y muestra la factura
document.getElementById('checkout').addEventListener('click', function() {
    const invoiceItems = document.getElementById('invoice-items');
    invoiceItems.innerHTML = '';
    let total = 0;

    carrito.forEach(producto => {
        const invoiceItem = document.createElement('li');
        invoiceItem.className = 'list-group-item invoice-item';
        invoiceItem.innerHTML = `
            <span>${producto.nombre} - ${producto.cantidad} x $${producto.precio.toFixed(2)}</span>
            <span>$${(producto.precio * producto.cantidad).toFixed(2)}</span>
        `;
        invoiceItems.appendChild(invoiceItem);

        total += producto.precio * producto.cantidad;
    });

    const impuesto = total * 0.15;
    total += impuesto;

    const taxItem = document.createElement('li');
    taxItem.className = 'list-group-item invoice-item';
    taxItem.innerHTML = `<span>Impuesto (15%)</span><span>$${impuesto.toFixed(2)}</span>`;
    invoiceItems.appendChild(taxItem);

    document.getElementById('invoice-total').textContent = total.toFixed(2);

    document.getElementById('invoice').classList.remove('d-none');
    carrito = [];
    actualizarCarrito();
});

// Permite al usuario seguir comprando después de ver la factura
document.getElementById('continue-shopping').addEventListener('click', function() {
    document.getElementById('invoice').classList.add('d-none');
    renderizarProductos();
});

// Inicializa la tienda
renderizarProductos();
