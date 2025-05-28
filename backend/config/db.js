import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sena',
    database: 'mi_app',
    waitForConnections: true,
    connectionLimit: 10,
});