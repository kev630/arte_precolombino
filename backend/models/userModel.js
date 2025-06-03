import { pool } from '../config/db.js';
//funcion crearUsuario
export const crearUsuario = async(nombre, correo, contraseña, id_rol) => {
    const [result] = await pool.query(
  'INSERT INTO usuarios(nombre, correo, contraseña, id_rol) VALUES (?, ?, ?, ?)',
  [nombre, correo, contraseña, id_rol]);
    return result.insertId;
};
// funcion buscarUsuarioPorCorreo
export const buscarUsuarioPorCorreo = async (correo) => {
    const [rows] = await pool.query(
        'select * from usuarios where correo = ?', [correo])
    return rows[0];
}

// funcion obtenerRolPorId
export const obtenerRolPorId = async (id_rol) =>{
    const [rows] = await pool.query(
        'select nombre from roles where id= ?', [id_rol]);
        return rows[0]?.nombre;
};