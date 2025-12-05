// services/bookingService.js
const pool = require('../config/db');

// Fungsi: User membuat pesanan baru
const createBooking = async (userId, bookingData) => {
    const { room_id, check_in, check_out, total_price } = bookingData;
    
    // Simpan ke tabel bookings
    const result = await pool.query(
        `INSERT INTO bookings (user_id, room_id, check_in, check_out, total_price, status) 
         VALUES ($1, $2, $3, $4, $5, 'Pending') RETURNING *`,
        [userId, room_id, check_in, check_out, total_price]
    );
    return result.rows[0];
};

// Fungsi: User melihat pesanan miliknya sendiri
const getUserBookings = async (userId) => {
    // Kita join dengan tabel rooms supaya dapat nama kamarnya juga
    const query = `
        SELECT b.id, b.check_in, b.check_out, b.total_price, b.status, r.type as room_type, r.image_url
        FROM bookings b
        JOIN rooms r ON b.room_id = r.id
        WHERE b.user_id = $1
        ORDER BY b.created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
};

module.exports = { createBooking, getUserBookings };