document.addEventListener('DOMContentLoaded', () => {
  const piezasSelect = document.getElementById('piezas_id');
  const culturaSelect = document.getElementById('cultura_id');
  const tamanioSelect = document.getElementById('tamanio_id');
  const form = document.getElementById('formProducto');
  const tabla = document.getElementById('tablaProductos');

  const correo = localStorage.getItem('correo');

  let editandoId = null;

  async function cargarSelect(url, select) {
    const res = await fetch(url);
    const datos = await res.json();
    select.innerHTML = '';
    datos.forEach(item => {
      const option = document.createElement('option');
      option.value = item.id || item[Object.keys(item)[0]];
      option.textContent = item.nombre || item[Object.keys(item)[1]];
      select.appendChild(option);
    });
  }

  async function listarProductos() {
    const res = await fetch('/api/productos');
    const productos = await res.json();

    tabla.innerHTML = '';
    productos.forEach(p => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${p.producto_id}</td>
        <td>${p.nombre_pieza}</td>
        <td>${p.cultura}</td>
        <td>${p.tamanio}</td>
        <td>${p.precio}</td>
        <td>${p.stock}</td>
        <td>
          <button class="editar" data-id="${p.producto_id}">✏️</button>
          <button class="eliminar" data-id="${p.producto_id}">🗑️</button>
        </td>
      `;
      tabla.appendChild(fila);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const datos = {
      piezas_id: piezasSelect.value,
      cultura_id: culturaSelect.value,
      tamanio_id: tamanioSelect.value,
      precio: form.precio.value,
      stock: form.stock.value,
      correo
    };

    const url = editandoId
      ? `/api/productos/${editandoId}`
      : '/api/productos';

    const metodo = editandoId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    const result = await res.json();
    alert(result.message);

    form.reset();
    editandoId = null;
    listarProductos();
  });

  tabla.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains('eliminar')) {
      const confirmacion = confirm('¿Eliminar producto?');
      if (!confirmacion) return;

      const res = await fetch(`/api/productos/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo })
      });

      const result = await res.json();
      alert(result.message);
      listarProductos();
    }

    if (e.target.classList.contains('editar')) {
      const res = await fetch('/api/productos');
      const productos = await res.json();
      const producto = productos.find(p => p.producto_id == id);

      piezasSelect.value = producto.piezas_id;
      culturaSelect.value = producto.cultura_id;
      tamanioSelect.value = producto.tamanio_id;
      form.precio.value = producto.precio;
      form.stock.value = producto.stock;
      editandoId = id;
    }
  });

  // Inicializar todo con rutas corregidas
  cargarSelect('/api/piezas', piezasSelect);
  cargarSelect('/api/culturas', culturaSelect);
  cargarSelect('/api/tamanios', tamanioSelect);
  listarProductos();

  // Crear pieza
  document.getElementById('formPieza').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre_pieza = document.getElementById('nuevaPieza').value;
    const res = await fetch('/api/piezas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre_pieza })
    });
    const result = await res.json();
    alert(result.message);
    document.getElementById('formPieza').reset();
    cargarSelect('/api/piezas', piezasSelect);
  });

  // Crear tamaño
  document.getElementById('formTamanio').addEventListener('submit', async (e) => {
    e.preventDefault();
    const tamanio = document.getElementById('nuevoTamanio').value;
    const res = await fetch('/api/tamanios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tamanio })
    });
    const result = await res.json();
    alert(result.message);
    document.getElementById('formTamanio').reset();
    cargarSelect('/api/tamanios', tamanioSelect);
  });

  // Crear cultura
document.getElementById('formCultura').addEventListener('submit', async (e) => {
  e.preventDefault();

  const cultura = document.getElementById('nuevaCultura').value.trim();

  if (!cultura) {
    alert('Debes ingresar un nombre de cultura');
    return;
  }

  try {
    const res = await fetch('/api/culturas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cultura })
    });

    const result = await res.json();

    if (res.ok) {
      alert(result.message);
      document.getElementById('formCultura').reset();
      cargarSelect('/api/culturas', culturaSelect);
    } else {
      alert(result.message || 'Error al agregar cultura');
    }

  } catch (error) {
    console.error('Error al crear cultura:', error);
    alert('Error al enviar la solicitud');
  }
});

});