// register.js

// Función de ayuda para evitar errores si falta un ID
const getValue = (id) => {
    const el = document.getElementById(id);
    if (!el) throw new Error(`Elemento con id="${id}" no encontrado`);
    return el.value;
};

// Espera a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registroForm');
    if (!form) {
        console.error('Formulario no encontrado');
        return;
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        try {
            const nombre = getValue('nombre');
            const apellido = getValue('apellido');
            const correo = getValue('correo');
            const cedula = getValue('cedula');
            const telefono = getValue('telefono');
            const direccion = getValue('direccion');
            const fecha_registro = getValue('fecha_registro');
            const contraseña = getValue('contrasena');
            const id_rol = getValue('rol_id');

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                nombre,
                apellido,
                correo,
                cedula,
                telefono,
                direccion,
                fecha_registro,
                contraseña,
                id_rol
            })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registro exitoso');
                window.location.href = 'login.html';
            } else {
                alert(data.error || 'Error al registrar');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Hubo un problema al conectar con el servidor');
        }
    });
});
