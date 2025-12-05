// controllers/bookingController.js
const bookingService = require('../services/bookingService');

const createBooking = async (req, res) => {
    try {
        // req.user.id didapat dari middleware (token)
        const userId = req.user.id; 
        const booking = await bookingService.createBooking(userId, req.body);
        
        res.status(201).json({
            success: true,
            message: "Pemesanan berhasil dibuat!",
            data: booking
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getMyBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await bookingService.getUserBookings(userId);
        
        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createBooking, getMyBookings };