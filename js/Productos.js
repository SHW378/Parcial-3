let productos = [];

fetch("Json/Productos.json")
    .then(res => res.json())
    .then(json => {
        productos = json;
        loadTabla();
    });

function loadTabla() {
    let cuerpo = "";
    productos.forEach((producto, idx) => {
        cuerpo += `
            <tr onclick="selectProducto(${idx})">
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>${producto.talla}</td>
                <td>${producto.color}</td>
                <td>${producto.categoria}</td>
            </tr>
        `;
    });
    document.getElementById("tblProductos").innerHTML = cuerpo;
}

function addProducto() {
    let producto = {
        nombre: document.getElementById("NombreProducto").value,
        precio: document.getElementById("Precio").value,
        stock: document.getElementById("Stock").value,
        talla: document.getElementById("Talla").value,
        color: document.getElementById("Color").value,
        categoria: document.getElementById("Categoria").value
    };
    productos.push(producto);
    loadTabla();
    limpiarFormulario();
}

function selectProducto(index) {
    const p = productos[index];
    document.getElementById("NombreProducto").value = p.nombre;
    document.getElementById("Precio").value = p.precio;
    document.getElementById("Stock").value = p.stock;
    document.getElementById("Talla").value = p.talla;
    document.getElementById("Color").value = p.color;
    document.getElementById("Categoria").value = p.categoria;

    window.selectedProducto = index;
    document.getElementById("btnActualizar").disabled = false;
    document.getElementById("btnEliminar").disabled = false;
}

function updateProducto() {
    let idx = window.selectedProducto;
    if (idx !== undefined) {
        productos[idx] = {
            nombre: document.getElementById("NombreProducto").value,
            precio: document.getElementById("Precio").value,
            stock: document.getElementById("Stock").value,
            talla: document.getElementById("Talla").value,
            color: document.getElementById("Color").value,
            categoria: document.getElementById("Categoria").value
        };
        loadTabla();
        limpiarFormulario();
    }
}

function deleteProducto() {
    let idx = window.selectedProducto;
    if (idx !== undefined) {
        productos.splice(idx, 1);
        loadTabla();
        limpiarFormulario();
    }
}

function limpiarFormulario() {
    document.getElementById("productosForm").reset();
    window.selectedProducto = undefined;
    document.getElementById("btnActualizar").disabled = true;
    document.getElementById("btnEliminar").disabled = true;
}

document.getElementById("productosForm").onsubmit = function (e) {
    e.preventDefault();
    addProducto();
};
document.getElementById("btnActualizar").onclick = updateProducto;
document.getElementById("btnEliminar").onclick = deleteProducto;
document.getElementById("productosForm").onreset = limpiarFormulario;

document.getElementById("btnActualizar").disabled = true;
document.getElementById("btnEliminar").disabled = true;
