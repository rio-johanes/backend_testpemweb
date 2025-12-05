// controllers/adminController.js
const pool = require('../config/db');

// 1. LIHAT SEMUA PESANAN (Dari semua user)
const getAllBookings = async (req, res) => {
    try {
        // Kita join 3 tabel: bookings, users (biar tau nama tamu), rooms (biar tau tipe kamar)
        const query = `
            SELECT b.id, u.name as guest_name, u.email, r.type as room_type, 
                   b.check_in, b.check_out, b.total_price, b.status
            FROM bookings b
            JOIN users u ON b.user_id = u.id
            JOIN rooms r ON b.room_id = r.id
            ORDER BY b.created_at DESC
        `;
        const result = await pool.query(query);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. UBAH STATUS PESANAN (Terima/Tolak/Selesai)
const updateBookingStatus = async (req, res) => {
    const { id } = req.params; // ID Booking dari URL
    const { status } = req.body; // Status baru yang dikirim Admin

    try {
        const result = await pool.query(
            'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Pesanan tidak ditemukan" });
        }

        res.json({ success: true, message: "Status berhasil diperbarui", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getAllBookings, updateBookingStatus };