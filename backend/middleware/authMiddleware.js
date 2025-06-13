import { pool } from '../config/db.js';

// ✅ Obtener el ID del rol por su nombre
export async function obtenerIdRolPorNombre(nombreRol) {
    const [rows] = await pool.query('SELECT id FROM roles WHERE nombre = ?', [nombreRol]);
    return rows[0]?.id;
}

// ✅ Verifica si el usuario existe y añade su info al req
export async function verificarUsuario(req, res, next) {
    try {
        const { correo } = req.body;
        if (!correo) {
            return res.status(400).json({ mensaje: 'Correo requerido' });
        }

        const [result] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        if (result.length === 0) {
            return res.status(401).json({ mensaje: 'Usuario no encontrado' });
        }

        req.usuario = result[0]; // Guarda el usuario en la request
        next();
    } catch (error) {
        console.error('Error en verificarUsuario:', error);
        res.status(500).json({ mensaje: 'Error del servidor al verificar usuario' });
    }
}

// ✅ Autoriza por roles (por ID de rol)
export function autorizarRoles(...rolesPermitidos) {
    return (req, res, next) => {
        if (!req.usuario || !rolesPermitidos.includes(req.usuario.id_rol)) {
            return res.status(403).json({ mensaje: 'Acceso no autorizado por rol' });
        }
        next();
    };
}

// ✅ Verifica correo y rol directamente (versión simplificada)
export async function verificarRol(req, res, next) {
    try {
        const { correo, rol } = req.body;
        if (!correo || !rol) {
            return res.status(400).json({ mensaje: 'Correo y rol son requeridos' });
        }

        const [result] = await pool.query(
            'SELECT * FROM usuarios WHERE correo = ? AND id_rol = ?',
            [correo, rol]
        );

        if (result.length === 0) {
            return res.status(403).json({ mensaje: 'Acceso no autorizado: rol incorrecto' });
        }

        next();
    } catch (error) {
        console.error('Error en verificarRol:', error);
        res.status(500).json({ mensaje: 'Error del servidor al verificar el rol' });
    }
}