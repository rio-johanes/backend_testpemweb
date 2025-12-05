// src/routes/room.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const multer = require('multer');
// Impor library GCS
const { Storage } = require('@google-cloud/storage');
const path = require('path');

// 1. Inisialisasi Google Cloud Storage
// GCS akan secara otomatis menggunakan kredensial dari GOOGLE_APPLICATION_CREDENTIALS
const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME;

// 2. Konfigurasi Multer: Menyimpan file di memory (buffer)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // Batas 5MB
    }
});

// 3. Middleware Upload ke GCS
const uploadToGCS = async (req, res, next) => {
    if (!req.file || !bucketName) {
        return next(); // Lanjut jika tidak ada file atau bucket name
    }

    try {
        const file = req.file;
        // Nama file unik di GCS: Timestamp + Ekstensi asli
        const fileName = rooms/${Date.now()}${path.extname(file.originalname)};
        
        const gcsFile = storage.bucket(bucketName).file(fileName);
        
        // Mulai proses upload
        const stream = gcsFile.createWriteStream({
            metadata: {
                contentType: file.mimetype,
                // Tambahkan header cache control jika perlu
                cacheControl: 'public, max-age=31536000',
            },
            resumable: false, 
        });

        stream.on('error', (err) => {
            console.error('GCS Upload Error:', err);
            next(new Error("Gagal mengunggah file ke Cloud Storage"));
        });

        stream.on('finish', () => {
            // Dapatkan URL publik dari GCS
            const publicUrl = https://storage.googleapis.com/${bucketName}/${gcsFile.name};
            
            // Simpan URL publik ke req.file agar bisa diambil di controller
            req.file.path = publicUrl; 
            next();
        });

        // Kirim buffer file ke GCS
        stream.end(file.buffer);

    } catch (error) {
        next(error);
    }
};

// Definisi Route
router.get('/', roomController.getRooms);
// Urutan: Upload ke Memory -> Upload ke GCS -> Lanjut ke Controller
router.post('/', upload.single('image'), uploadToGCS, roomController.addRoom); 
router.delete('/:id', roomController.deleteRoom);
router.put('/:id', roomController.editRoom);

module.exports = router;
