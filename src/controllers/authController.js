// controllers/authController.js
const authService = require('../services/authService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        // Frontend kamu mengirim: name, email, phone, password
        const newUser = await authService.registerUser(req.body);
        
        res.status(201).json({
            success: true,
            message: "Registrasi Berhasil! Silakan Login.",
            data: { 
                id: newUser.id, 
                name: newUser.name, 
                email: newUser.email 
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ success: false, message: "Email tidak ditemukan" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Password salah" });
        }

        // Masukkan role & nama ke dalam token agar frontend bisa baca
        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.name }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            message: "Login Berhasil",
            token: token,
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { register, login };