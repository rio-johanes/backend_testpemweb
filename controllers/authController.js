const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.json({ message: "Register berhasil", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body.email, req.body.password);
    // Mengembalikan role agar Frontend bisa redirect (Admin -> Dashboard Admin, User -> Dashboard User)
    res.json({ 
      message: "Login berhasil", 
      token, 
      role: user.role, 
      name: user.name,
      userId: user.id 
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};