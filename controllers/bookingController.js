const bookingService = require('../services/bookingService');

exports.createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking({
      ...req.body,
      userId: req.user.id // Dari middleware JWT
    });
    res.json({ message: "Pemesanan berhasil dibuat", booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getUserBookings(req.user.id);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};