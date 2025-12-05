// src/routes/room.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // <--- Tambahan Wajib

// Konfigurasi Penyimpanan Pintar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Tentukan folder uploads di Root Project
        const dir = path.join(process.cwd(), 'uploads');

        // Cek: Kalau folder belum ada, buat dulu!
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: function (req, file, cb) {
        // Nama file unik: DetikSaatIni + EkstensiAsli
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

// Definisi Route
router.get('/', roomController.getRooms);
// Tambahkan middleware upload.single('image') di sini
router.post('/', upload.single('image'), roomController.addRoom);
router.delete('/:id', roomController.deleteRoom);
router.put('/:id', roomController.editRoom);

module.exports = router;