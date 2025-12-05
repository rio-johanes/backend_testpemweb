// src/services/roomService.js
const pool = require('../config/db');

const getAllRooms = async () => {
    const result = await pool.query('SELECT * FROM rooms ORDER BY id ASC');
    return result.rows;
};

// --- BAGIAN INI YANG SALAH SEBELUMNYA ---
const createRoom = async (roomData) => {
    // Tambahkan 'image_url' di sini supaya ditangkap
    const { type, price, description, facilities, status, image_url } = roomData;
    
    const result = await pool.query(
        // Tambahkan kolom image_url ke dalam Query SQL ($6)
        'INSERT INTO rooms (type, price, description, facilities, status, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [type, price, description, facilities, status, image_url]
    );
    return result.rows[0];
};
// -----------------------------------------

const deleteRoomById = async (id) => {
    const result = await pool.query('DELETE FROM rooms WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

const updateRoomById = async (id, roomData) => {
    const { type, price, description, facilities, status } = roomData;
    
    // Note: Update gambar belum kita buat di frontend, jadi sementara ini update data teks dulu
    const result = await pool.query(
        `UPDATE rooms 
         SET type = $1, price = $2, description = $3, facilities = $4, status = $5 
         WHERE id = $6 RETURNING *`,
        [type, price, description, facilities, status, id]
    );
    return result.rows[0];
};

module.exports = {
    getAllRooms,
    createRoom,
    deleteRoomById,
    updateRoomById
};