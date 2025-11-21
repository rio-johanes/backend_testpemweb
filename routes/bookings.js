const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken } = require('../middleware/authMiddleware'); // Buat middleware simpel di bawah

router.post('/', verifyToken, bookingController.createBooking); // User pesan
router.get('/my', verifyToken, bookingController.getMyBookings); // User lihat history
router.get('/all', verifyToken, bookingController.getAllBookings); // Admin lihat semua

module.exports = router;