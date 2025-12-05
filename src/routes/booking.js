// routes/booking.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const verifyToken = require('../middleware/authMiddleware');

// Pastikan verifyToken dan bookingController tidak undefined/error
router.post('/', verifyToken, bookingController.createBooking);
router.get('/my', verifyToken, bookingController.getMyBookings);

// --- BAGIAN INI WAJIB ADA ---
module.exports = router;