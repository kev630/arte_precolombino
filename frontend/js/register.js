document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById ('apellido').value;
    const correo = document.getElementById('correo').value;
    const cedula = document.getElementById('cedula').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const fecha_registro = document.getElementById('fecha_registro').value;
    const contraseña = document.getElementById('contraseña').value;
    const id_rol = document.getElementById('rol').value;

    const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, email, cedula, telefono, direccion, fecha_registro, contraseña, id_rol }),
    });
    const data = await res.json();
    alert(data.message);
    if(res.status ===201) window.location.href = './login.html';
})