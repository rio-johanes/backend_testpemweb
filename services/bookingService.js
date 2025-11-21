const prisma = require('../config/db');

exports.createBooking = async (data) => {
  // Logic: Validasi ketersediaan sebelum booking
  const room = await prisma.room.findUnique({ where: { id: data.roomId } });
  
  if (room.status !== 'AVAILABLE') {
    throw new Error('Kamar tidak tersedia atau penuh');
  }

  // Jika sukses, buat booking
  return await prisma.booking.create({
    data: {
      userId: data.userId,
      roomId: data.roomId,
      checkIn: new Date(data.checkIn),
      checkOut: new Date(data.checkOut),
      total: data.total,
      status: 'PENDING' // Default pending sampai admin confirm
    }
  });
};

exports.getUserBookings = async (userId) => {
  return await prisma.booking.findMany({
    where: { userId },
    include: { room: true },
    orderBy: { createdAt: 'desc' }
  });
};

exports.getAllBookings = async () => { // Untuk Admin
  return await prisma.booking.findMany({
    include: { user: true, room: true },
    orderBy: { createdAt: 'desc' }
  });
};