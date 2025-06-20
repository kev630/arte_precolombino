document.addEventListener('DOMContentLoaded', () => {
  verificarAdmin();
  listarUsuarios();
  document.getElementById('logoutBtn').addEventListener('click', cerrarSesion);
});

function getTokenHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

function verificarAdmin() {
  const usuarioRaw = localStorage.getItem('usuario');
  if (!usuarioRaw) return location.href = '/index.html';

  const usuario = JSON.parse(usuarioRaw);
  if (usuario.id_rol !== 3) return location.href = '/index.html';
}

async function listarUsuarios() {
  try {
    const res = await fetch('http://localhost:3000/api/usuarios', {
      method: 'GET',
      headers: getTokenHeaders()
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al obtener usuarios');

    const tbody = document.getElementById('tablaUsuarios');
    tbody.innerHTML = '';

    data.forEach(usuario => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${usuario.usuario_id}</td>
        <td>${usuario.cedula}</td>
        <td>${usuario.nombre} ${usuario.apellido}</td>
        <td>${usuario.correo}</td>
        <td>${usuario.nombre_rol}</td>
        <td>${usuario.activo ? 'Activo' : 'Baneado'}</td>
        <td>
          <button onclick="banearUsuario(${usuario.usuario_id})">Banear</button>
          <button onclick="enviarCorreo('${usuario.correo}')">Correo</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error(err);
    alert('No se pudieron cargar los usuarios');
  }
}

async function banearUsuario(id) {
  if (!confirm('¿Estás seguro de banear este usuario?')) return;

  try {
    const res = await fetch(`http://localhost:3000/api/usuarios/${id}/banear`, {
      method: 'PUT',
      headers: getTokenHeaders()
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error al banear');

    alert('Usuario baneado correctamente');
    listarUsuarios();
  } catch (err) {
    console.error(err);
    alert('No se pudo banear al usuario');
  }
}

function enviarCorreo(correo) {
  const asunto = prompt('Asunto del correo:');
  const mensaje = prompt('Mensaje para enviar:');
  if (!asunto || !mensaje) return;

  fetch('http://localhost:3000/api/usuarios/enviar-correo', {
    method: 'POST',
    headers: getTokenHeaders(),
    body: JSON.stringify({ correo, asunto, mensaje })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || 'Correo enviado');
    })
    .catch(err => {
      console.error(err);
      alert('No se pudo enviar el correo');
    });
}

function cerrarSesion() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  location.href = '/index.html';
}