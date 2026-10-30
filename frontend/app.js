const API_URL = "http://127.0.0.1:5000";

document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias();
    cargarProductos();
    cargarEntradas();

    // Eventos de Formularios
    document.getElementById("form-categoria").addEventListener("submit", guardarCategoria);
    document.getElementById("form-producto").addEventListener("submit", guardarProducto);
    document.getElementById("form-entrada").addEventListener("submit", guardarEntrada);
});

// ==========================================
// CATEGORÍAS
// ==========================================
async function cargarCategorias() {
    try {
        const res = await fetch(`${API_URL}/categorias`);
        const data = await res.json();
        
        const tabla = document.getElementById("tabla-categorias");
        const selectProd = document.getElementById("prod-categoria");
        
        tabla.innerHTML = "";
        selectProd.innerHTML = `<option value="">Seleccione una categoría</option>`;

        data.forEach(c => {
            // Llenar tabla
            tabla.innerHTML += `
                <tr>
                    <td>${c.id}</td>
                    <td class="fw-bold">${c.nombre}</td>
                    <td>${c.descripcion || '-'}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-danger" onclick="eliminarCategoria(${c.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
            // Llenar select en formulario de productos
            selectProd.innerHTML += `<option value="${c.id}">${c.nombre}</option>`;
        });
    } catch (err) {
        console.error("Error al cargar categorías:", err);
    }
}

async function guardarCategoria(e) {
    e.preventDefault();
    const body = {
        nombre: document.getElementById("cat-nombre").value,
        descripcion: document.getElementById("cat-descripcion").value
    };

    const res = await fetch(`${API_URL}/categorias`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        document.getElementById("form-categoria").reset();
        cargarCategorias();
    }
}

async function eliminarCategoria(id) {
    if (!confirm("¿Eliminar categoría?")) return;
    await fetch(`${API_URL}/categorias/${id}`, { method: "DELETE" });
    cargarCategorias();
}

// ==========================================
// PRODUCTOS
// ==========================================
async function cargarProductos() {
    try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        
        const tabla = document.getElementById("tabla-productos");
        const selectEnt = document.getElementById("ent-producto");
        
        tabla.innerHTML = "";
        selectEnt.innerHTML = `<option value="">Seleccione un producto</option>`;

        data.forEach(p => {
            tabla.innerHTML += `
                <tr>
                    <td>${p.id}</td>
                    <td class="fw-bold">${p.nombre}</td>
                    <td>$${p.precio}</td>
                    <td><span class="badge bg-info text-dark">${p.categoria_nombre || 'N/A'}</span></td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${p.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
            selectEnt.innerHTML += `<option value="${p.id}">${p.nombre}</option>`;
        });
    } catch (err) {
        console.error("Error al cargar productos:", err);
    }
}

async function guardarProducto(e) {
    e.preventDefault();
    const body = {
        nombre: document.getElementById("prod-nombre").value,
        precio: parseFloat(document.getElementById("prod-precio").value),
        stock_min: parseInt(document.getElementById("prod-stock").value),
        categoria_id: parseInt(document.getElementById("prod-categoria").value),
        descripcion: document.getElementById("prod-descripcion").value
    };

    const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        document.getElementById("form-producto").reset();
        cargarProductos();
    }
}

async function eliminarProducto(id) {
    if (!confirm("¿Eliminar producto?")) return;
    await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
    cargarProductos();
}

// ==========================================
// ENTRADAS
// ==========================================
async function cargarEntradas() {
    try {
        const res = await fetch(`${API_URL}/entradas`);
        const data = await res.json();
        
        const tabla = document.getElementById("tabla-entradas");
        tabla.innerHTML = "";

        data.forEach(e => {
            tabla.innerHTML += `
                <tr>
                    <td>${e.id}</td>
                    <td class="fw-bold">${e.producto_nombre || 'N/A'}</td>
                    <td><span class="badge bg-success">+${e.cantidad}</span></td>
                    <td>${e.factura}</td>
                    <td>${e.ubicacion} (Stand ${e.stand})</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-danger" onclick="eliminarEntrada(${e.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error("Error al cargar entradas:", err);
    }
}

async function guardarEntrada(ev) {
    ev.preventDefault();
    const body = {
        entra_producto_id: parseInt(document.getElementById("ent-producto").value),
        entra_cantidad: parseInt(document.getElementById("ent-cantidad").value),
        entra_factura: document.getElementById("ent-factura").value,
        entra_stand: document.getElementById("ent-stand").value,
        entra_ubicacion: document.getElementById("ent-ubicacion").value
    };

    const res = await fetch(`${API_URL}/entradas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (res.ok) {
        document.getElementById("form-entrada").reset();
        cargarEntradas();
    }
}

async function eliminarEntrada(id) {
    if (!confirm("¿Eliminar entrada?")) return;
    await fetch(`${API_URL}/entradas/${id}`, { method: "DELETE" });
    cargarEntradas();
}