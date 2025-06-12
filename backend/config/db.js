import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sena',
    database: 'precolombinos',
    waitForConnections: true,
    connectionLimit: 10,
});

export default pool;