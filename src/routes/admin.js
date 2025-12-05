// routes/admin.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// Middleware Khusus Admin (Cek Role)
const verifyAdmin = (req, res, next) => {
    // req.user didapat dari verifyToken sebelumnya
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ success: false, message: "Akses Ditolak! Khusus Admin." });
    }
    next();
};

// Route: Lihat Semua Pesanan
// Urutannya: Cek Token -> Cek Apakah Admin -> Baru jalankan Controller
router.get('/bookings', verifyToken, verifyAdmin, adminController.getAllBookings);

// Route: Update Status Pesanan (Pakai ID di URL)
router.put('/bookings/:id', verifyToken, verifyAdmin, adminController.updateBookingStatus);

module.exports = router;

