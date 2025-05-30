document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').Value;
    const correo = document.getElementById('correo').Value;
    const contraseña = document.getElementById('contraseña').Value;
    const rol = document.getElementById('rol').Value;

    const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, contraseña, id_rol }),
    });
    const data = await res.json();
    alert(data.message);
    if(res,status ===201) window.location.href = './login.html';
})