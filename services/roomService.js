const prisma = require('../config/db');

exports.getAllRooms = async () => {
  return await prisma.room.findMany();
};

exports.updateRoomStatus = async (id, status) => {
  return await prisma.room.update({
    where: { id: parseInt(id) },
    data: { status }
  });
};

// Cek apakah kamar tersedia (Logic: Status harus AVAILABLE)
exports.checkAvailability = async (roomId) => {
  const room = await prisma.room.findUnique({ where: { id: roomId } });
  if (!room) return false;
  return room.status === 'AVAILABLE';
};