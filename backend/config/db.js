import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'mi_app',
  waitForConnections: true,
  connectionLimit: 10
});
