// services/authService.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const registerUser = async (userData) => {
    const { name, email, phone, password } = userData;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Default role adalah 'user'
    const result = await pool.query(
        'INSERT INTO users (name, email, phone, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, phone, hashedPassword, 'user']
    );
    return result.rows[0];
};

const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

module.exports = { registerUser, findUserByEmail };