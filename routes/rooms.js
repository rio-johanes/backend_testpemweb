const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.get('/', roomController.getRooms); // Public: Untuk halaman kamar.html
router.patch('/:id/status', roomController.updateStatus); // Admin only (perlu middleware)

module.exports = router;