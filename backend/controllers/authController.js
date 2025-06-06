import bcrypt from 'bcrypt';
import { buscarUsuarioPorCorreo, 
    crearUsuario, 
    obtenerRolPorId 
} from '../models/userModel.js';

export const register = async (req, res) => {
    const {nombre, apellido, correo, cedula, telefono, direccion, fecha_registro, contraseña, id_rol} = req.body;
    // Validación básica
    if (!nombre || !apellido || !correo || !cedula || !telefono || !direccion || !fecha_registro || !contraseña || !id_rol) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    const userExistente = await buscarUsuarioPorCorreo(correo);
    if (userExistente) {
        return res.status(400).json({ message: 'Usuario ya registrado'});
    }
    const hash = await bcrypt.hash(contraseña, 10);
    await crearUsuario(nombre, apellido, correo, cedula, telefono, direccion, fecha_registro, hash, id_rol);
    res.status(201).json({ message: 'Usuario creado exitosamente'});
}
export const login = async (req, res) => {
    const { correo, contraseña } = req.body;
    if (!correo || !contraseña) {
        return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
    }
    const user = await buscarUsuarioPorCorreo(correo);
    const credencialesValidas = user && await bcrypt.compare(contraseña, user.contraseña);
    if (!credencialesValidas) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    const rolData = await obtenerRolPorId(user.id_rol);
    const rol = typeof rolData === 'string' ? rolData.toLowerCase() : 'desconocido';
    res.status(200).json({ message: 'Login exitoso', rol });
}