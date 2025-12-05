// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Ambil token dari header (Authorization: Bearer <token>)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Akses ditolak! Anda belum login." });
    }

    try {
        // 2. Cek keaslian token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Simpan data user (id, role) ke dalam request supaya bisa dipakai di controller
        req.user = decoded; 
        next(); // Lanjut ke controller
    } catch (error) {
        return res.status(403).json({ success: false, message: "Token tidak valid!" });
    }
};

module.exports = verifyToken;