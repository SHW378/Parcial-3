let pedidos = [];

fetch("Json/Pedidos.json")
    .then(respuesta => respuesta.json())
    .then(json => {
        pedidos = json;
        loadTabla();
    });

function loadTabla() {
    let cuerpo = "";
    pedidos.forEach(function(pedido, idx) {
        let registro = `
            <tr onclick="selectPedidos(${idx})">
                <td>${pedido.Nombre}</td>
                <td>${pedido.Cantidad ? pedido.Cantidad : ""}</td>
                <td>${pedido.Fecha ? pedido.Fecha : ""}</td>
                <td>${pedido.Estado ? pedido.Estado : ""}</td>
            </tr>
        `;
        cuerpo += registro;
    });
    document.getElementById("tblPedidos").innerHTML = cuerpo;
}

function addPedido() {
    let pedido = {};
    pedido.nombre = document.getElementById("Nombre").value;
    pedido.fecha = document.getElementById("Fecha").value;
    pedido.cantidad = document.getElementById("Cantidad").value;
    pedido.estado = document.getElementById("Estado").value;
    pedidos.push(pedido);
    loadTabla();
    limpiarFormulario();
}

function selectPedidos(index) {
    let pedido = pedidos[index];
    document.getElementById("Nombre").value = pedido.Nombre;
    document.getElementById("Fecha").value = pedido.Fecha;
    document.getElementById("Cantidad").value = pedido.Cantidad;
    document.getElementById("Estado").value = pedido.Estado;


    // Guardar el índice seleccionado para actualizar/eliminar
    window.selectedPedido = index;

    document.getElementById("btnActualizar").disabled = false;
    document.getElementById("btnEliminar").disabled = false;
}

function updatePedido() {
    let idx = window.selectedPedido;
    if (idx !== undefined) {
        pedidos[idx] = {
            Nombre: document.getElementById("Nombre").value,
            Fecha: document.getElementById("Fecha").value,
            Cantidad: document.getElementById("Cantidad").value,
            Estado: document.getElementById("Estado").value
        };
        loadTabla();
        limpiarFormulario();
    }
}

function deletePedido() {
    let idx = window.selectedPedido;
    if (idx !== undefined) {
        pedidos.splice(idx, 1);
        loadTabla();
        limpiarFormulario();
    }
}

function limpiarFormulario() {
    document.getElementById("pedidosForm").reset();
    window.selectedCliente = undefined;
    document.getElementById("btnActualizar").disabled = true;
    document.getElementById("btnEliminar").disabled = true;
}

// Eventos para los botones
document.getElementById("pedidosForm").onsubmit = function(e) {
    e.preventDefault();
    addCliente();
};
document.getElementById("btnActualizar").onclick = updatePedido;
document.getElementById("btnEliminar").onclick = deletePedido;
document.getElementById("pedidosForm").onreset = limpiarFormulario;

// Desactivar botones
document.getElementById("btnActualizar").disabled = true;
document.getElementById("btnEliminar").disabled = true;