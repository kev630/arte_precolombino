// frontend/js/login.js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const correo = document.getElementById('correo').value;
  const contraseña = document.getElementById('contraseña').value;

  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contraseña })
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Guardar usuario_id en localStorage
      localStorage.setItem('usuario_id', data.usuario.usuario_id);
      localStorage.setItem('nombre', data.usuario.nombre);
      localStorage.setItem('apellido', data.usuario.apellido);
      localStorage.setItem('rol', data.usuario.id_rol);

      // Redirigir según el rol
      switch (data.usuario.id_rol) {
        case 1: window.location.href = '../pages/cliente.html'; break;
        case 2: window.location.href = '../pages/operario.html'; break;
        case 3: window.location.href = '../pages/admin.html'; break;
        default: alert('Rol desconocido'); break;
      }

    } else {
      alert(data.message || 'Error en el login');
    }

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert('Error de conexión');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const enlace = document.getElementById('olvideContrasena');
  if (enlace) {
    enlace.addEventListener('click', (event) => {
      event.preventDefault(); // ← importante
      const correo = prompt('Ingresa tu correo para recuperar tu contraseña:');
      if (!correo) return;

      fetch('http://localhost:3000/api/auth/solicitar-recuperacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo })
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message || 'Revisa tu correo para instrucciones.');
        })
        .catch(err => {
          console.error('Error:', err);
          alert('No se pudo enviar el correo.');
        });
    });
  } else {
    console.warn('El enlace de recuperación no se encontró en el DOM');
  }
});
