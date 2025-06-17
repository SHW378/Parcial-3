let categorias = [];

fetch("Json/Categorias.json")
    .then(respuesta => respuesta.json())
    .then(json => {
        categorias = json;
        loadTabla();
    });

function loadTabla() {
    let cuerpo = "";
    categorias.forEach(function(categoria, idx) {
        let registro = `
            <tr onclick="selectCategorias(${idx})">
                <td>${categoria.Nombre || ""}</td>
                <td>${categoria.Fecha || ""}</td>
                <td>${categoria.Descripcion || ""}</td>
                <td>${categoria.Estado || ""}</td>
            </tr>
        `;
        cuerpo += registro;
    });
    document.getElementById("tblCategorias").innerHTML = cuerpo;
}

function addCategoria() {
    let categoria = {};
    categoria.Nombre = document.getElementById("Nombre").value;
    categoria.Fecha = document.getElementById("Fecha").value;
    categoria.Descripcion = document.getElementById("Descripcion").value;
    categoria.Estado = document.getElementById("Estado").value;
    categorias.push(categoria);
    loadTabla();
    limpiarFormulario();
}

function selectCategorias(index) {
    let categoria = categorias[index];
    document.getElementById("Nombre").value = categoria.Nombre;
    document.getElementById("Fecha").value = categoria.Fecha;
    document.getElementById("Descripcion").value = categoria.Descripcion;
    document.getElementById("Estado").value = categoria.Estado;


    // Guardar el índice seleccionado para actualizar/eliminar
    window.selectedCategoria = index;

    document.getElementById("btnActualizar").disabled = false;
    document.getElementById("btnEliminar").disabled = false;
}

function updateCategoria() {
    let idx = window.selectedCategoria;
    if (idx !== undefined) {
        categorias[idx] = {
            Nombre: document.getElementById("Nombre").value,
            Fecha: document.getElementById("Fecha").value,
            Descripcion: document.getElementById("Descripcion").value,
            Estado: document.getElementById("Estado").value
        };
        loadTabla();
        limpiarFormulario();
    }
}

function deleteCategoria() {
    let idx = window.selectedCategoria;
    if (idx !== undefined) {
        categorias.splice(idx, 1);
        loadTabla();
        limpiarFormulario();
    }
}

function limpiarFormulario() {
    document.getElementById("categoriasForm").reset();
    window.selectedCliente = undefined;
    document.getElementById("btnActualizar").disabled = true;
    document.getElementById("btnEliminar").disabled = true;
}

// Eventos para los botones
document.getElementById("categoriasForm").onsubmit = function(e) {
    e.preventDefault();
    addCategoria();
};
document.getElementById("btnActualizar").onclick = updateCategoria;
document.getElementById("btnEliminar").onclick = deleteCategoria;
document.getElementById("categoriasForm").onreset = limpiarFormulario();

// Desactivar botones
document.getElementById("btnActualizar").disabled = true;
document.getElementById("btnEliminar").disabled = true;