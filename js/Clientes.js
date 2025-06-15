let clientes = [];

fetch("Json/Clientes.json")
    .then(respuesta => respuesta.json())
    .then(json => {
        clientes = json;
        loadTabla();
    });

function loadTabla() {
    let cuerpo = "";
    clientes.forEach(function(cliente, idx) {
        let registro = `
            <tr onclick="selectClientes(${idx})">
                <td>${cliente.nombre}</td>
                <td>${cliente.apellido ? cliente.apellido : ""}</td>
                <td>${cliente.telefono ? cliente.telefono : ""}</td>
                <td>${cliente.correo ? cliente.correo : ""}</td>
                <td>${cliente.direccion ? cliente.direccion : ""}</td>
                <td>${cliente.historial ? cliente.historial : ""}</td>
            </tr>
        `;
        cuerpo += registro;
    });
    document.getElementById("tblClientes").innerHTML = cuerpo;
}

function addCliente() {
    let cliente = {};
    cliente.nombre = document.getElementById("nombre").value;
    cliente.apellido = document.getElementById("apellido").value;
    cliente.telefono = document.getElementById("telefono").value;
    cliente.correo = document.getElementById("correo").value;
    cliente.direccion = document.getElementById("direccion").value;
    cliente.historial = document.getElementById("historial").value;
    clientes.push(cliente);
    loadTabla();
    limpiarFormulario();
}

function selectClientes(index) {
    let cliente = clientes[index];
    document.getElementById("nombre").value = cliente.nombre;
    document.getElementById("apellido").value = cliente.apellido;
    document.getElementById("telefono").value = cliente.telefono;
    document.getElementById("correo").value = cliente.correo;
    document.getElementById("direccion").value = cliente.direccion;
    document.getElementById("historial").value = cliente.historial;

    // Guardar el índice seleccionado para actualizar/eliminar
    window.selectedCliente = index;

    document.getElementById("btnActualizar").disabled = false;
    document.getElementById("btnEliminar").disabled = false;
}

function updateCliente() {
    let idx = window.selectedCliente;
    if (idx !== undefined) {
        clientes[idx] = {
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            telefono: document.getElementById("telefono").value,
            correo: document.getElementById("correo").value,
            direccion: document.getElementById("direccion").value,
            historial: document.getElementById("historial").value
        };
        loadTabla();
        limpiarFormulario();
    }
}

function deleteCliente() {
    let idx = window.selectedCliente;
    if (idx !== undefined) {
        clientes.splice(idx, 1);
        loadTabla();
        limpiarFormulario();
    }
}

function limpiarFormulario() {
    document.getElementById("clienteForm").reset();
    window.selectedCliente = undefined;
    document.getElementById("btnActualizar").disabled = true;
    document.getElementById("btnEliminar").disabled = true;
}

// Eventos para los botones
document.getElementById("clienteForm").onsubmit = function(e) {
    e.preventDefault();
    addCliente();
};
document.getElementById("btnActualizar").onclick = updateCliente;
document.getElementById("btnEliminar").onclick = deleteCliente;
document.getElementById("clienteForm").onreset = limpiarFormulario;

// Desactivar botones
document.getElementById("btnActualizar").disabled = true;
document.getElementById("btnEliminar").disabled = true;