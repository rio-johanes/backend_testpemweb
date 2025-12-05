const { Pool } = require('pg');
require('dotenv').config();

const poolConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,

    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
};

const pool = new Pool(poolConfig);

pool.connect((err) => {
    if (err) {
        console.error('Koneksi database gagal:', err);
    } else {
        console.log('Berhasil terhubung ke Database PostgreSQL');
    }
});

module.exports = pool;