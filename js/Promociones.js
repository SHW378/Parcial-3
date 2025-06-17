let promociones = [];

fetch("Json/Promociones.json")
    .then(respuesta => respuesta.json())
    .then(json => {
        promociones = json;
        loadTabla();
    });

function loadTabla() {
    let cuerpo = "";
    promociones.forEach(function(promocion, idx){
        let registro = `
            <tr onclick="selectPromociones(${idx})">
                <td>${promocion.nombre || ""}</td>
                <td>${promocion.Descuento || ""}</td>
                <td>${promocion.fechaActiva || ""}</td>
            </tr>
        `;
        cuerpo += registro;
    });
    document.getElementById("tblPromociones").innerHTML = cuerpo;
}

function addPromocion() {
    let promocion = {};
    promocion.nombre = document.getElementById("nombre").value;
    promocion.Descuento = document.getElementById("Descuento").value;
    promocion.fechaActiva = document.getElementById("fechaActiva").value;
    promociones.push(promocion);
    loadTabla();
}

function selectPromociones(index) {
    let promocion = promociones[index];
    document.getElementById("nombre").value = promocion.nombre;
    document.getElementById("Descuento").value = promocion.Descuento;
    document.getElementById("fechaActiva").value = promocion.fechaActiva;

    // Guardar el índice seleccionado para actualizar/eliminar
    window.selectedPromocion = index;
    document.getElementById("btnActualizar").disabled = false;
    document.getElementById("btnEliminar").disabled = false;
}

function updatePromocion() {
    let idx = window.selectedPromocion;
    if (idx !== undefined) {
        promociones[idx] = {
            nombre: document.getElementById("nombre").value,
            Descuento: document.getElementById("Descuento").value,
            fechaActiva: document.getElementById("fechaActiva").value
        };
        loadTabla();
        limpiarFormulario();
    }
}

function deletePromocion() {
    let idx = window.selectedPromocion;
    if (idx !== undefined) {
        promociones.splice(idx, 1);
        loadTabla();
        limpiarFormulario();
    }
}

function limpiarFormulario() {
    document.getElementById("promocionForm").reset();
    window.selectedPromocion = undefined;
    document.getElementById("btnActualizar").disabled = true;
    document.getElementById("btnEliminar").disabled = true;
}

// Eventos para los botones
document.getElementById("promocionForm").onsubmit = function(e) {
    e.preventDefault();
    addPromocion();
}
document.getElementById("btnActualizar").onclick = updatePromocion;
document.getElementById("btnEliminar").onclick = deletePromocion;
document.getElementById("promocionForm").onreset = limpiarFormulario();

// Desactivar botones
document.getElementById("btnActualizar").disabled = true;
document.getElementById("btnEliminar").disabled = true;
