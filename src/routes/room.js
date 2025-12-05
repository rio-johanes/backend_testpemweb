// src/routes/room.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const multer = require('multer');

// --- Perubahan Kunci Cloudinary Dimulai Di Sini ---
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs'); 

// Konfigurasi Cloudinary menggunakan variabel lingkungan
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Konfigurasi Penyimpanan Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'grandluxe_rooms', // Tentukan folder di Cloudinary
        // Mengubah format file yang diupload menjadi webp (lebih hemat bandwidth)
        format: async (req, file) => 'webp', 
        // Nama file unik di Cloudinary
        public_id: (req, file) =>`${Date.now()}-${file.originalname.split('.')[0]}`,
    },
});

const upload = multer({ storage: storage });
// --- Perubahan Kunci Cloudinary Selesai Di Sini ---


// Definisi Route
router.get('/', roomController.getRooms);
// Middleware upload.single('image') sekarang mengunggah langsung ke Cloudinary
router.post('/', upload.single('image'), roomController.addRoom);
router.delete('/:id', roomController.deleteRoom);
router.put('/:id', roomController.editRoom);

module.exports = router;

