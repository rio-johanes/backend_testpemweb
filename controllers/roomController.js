const roomService = require('../services/roomService');

exports.getRooms = async (req, res) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    // Admin mengubah status (AVAILABLE, FULL, MAINTENANCE, UNAVAILABLE)
    const room = await roomService.updateRoomStatus(req.params.id, req.body.status);
    res.json({ message: "Status kamar diperbarui", room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};