// controllers/roomController.js
const roomService = require('../services/roomService');

// GET ALL ROOMS
const getRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllRooms();
        res.status(200).json({ success: true, data: rooms });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ADD ROOM (UPDATED: SUPPORT FOTO)
const addRoom = async (req, res) => {
    try {
        // --- PERUBAHAN DIMULAI DI SINI ---
        // Ganti URL lokal dengan variabel lingkungan BASE_URL
        const BASE_URL = process.env.BASE_URL; 
        
        // 1. Cek apakah ada file yang diupload lewat Multer?
        // Kalau ada, buat URL-nya menggunakan BASE_URL.
       const imagePath = req.file ? `${BASE_URL}/uploads/${req.file.filename}` : null
        // --- PERUBAHAN SELESAI DI SINI ---

        // 2. Gabungkan data teks (dari req.body) dengan link gambar
        const roomData = {
            ...req.body,
            image_url: imagePath // Tambahkan properti ini agar disimpan service
        };

        // 3. Kirim data lengkap ke Service
        const newRoom = await roomService.createRoom(roomData);
        
        res.status(201).json({
            success: true,
            message: "Kamar berhasil ditambahkan dengan FOTO!",
            data: newRoom
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE ROOM
const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedRoom = await roomService.deleteRoomById(id); 

        if (!deletedRoom) {
            return res.status(404).json({ success: false, message: "Kamar tidak ditemukan" });
        }

        res.status(200).json({ success: true, message: "Kamar berhasil dihapus" });
    } catch (error) {
        if (error.code === '23503') {
            return res.status(400).json({ success: false, message: "Gagal hapus! Kamar ini masih ada dalam data pemesanan." });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// EDIT ROOM
const editRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRoom = await roomService.updateRoomById(id, req.body);

        if (!updatedRoom) {
            return res.status(404).json({ success: false, message: "Kamar tidak ditemukan" });
        }

        res.status(200).json({ success: true, message: "Kamar berhasil diupdate", data: updatedRoom });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getRooms,
    addRoom,
    deleteRoom,
    editRoom
};