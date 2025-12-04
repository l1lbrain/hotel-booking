import express from 'express';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';

const chatbotRouter = express.Router();


//Lấy thông tin tất cả các phòng
chatbotRouter.get('/', async (req, res) => {
    try {
        let filter = {isAvailable: true};
        const rooms = await Room.find(filter);
        const roomsWithUrl = rooms.map(room => ({
            ...room._doc,
            url: `${process.env.FRONTEND_URL}/rooms/${room._id}`
        }));
        res.json({success: true, rooms: roomsWithUrl});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
});

chatbotRouter.post('/rooms', async (req, res) => {
    try {
        const { checkInDate, checkOutDate } = req.body;
        // Lấy toàn bộ phòng
        const rooms = await Room.find({ isAvailable: true }); // phòng bị bảo trì thì tự loại
        const availableRooms = [];
        for (const room of rooms) {
            const bookings = await Booking.find({
                room: room._id.toString(),
                status: { $in: ["Đang chờ", "Đã thanh toán"] },
                $and: [
                    { checkInDate: { $lte: checkOutDate } },
                    { checkOutDate: { $gte: checkInDate } }
                ]
            });
            const isAvailable = bookings.length === 0;
            if (isAvailable) {
                availableRooms.push({
                    ...room._doc,
                    url: `${process.env.FRONTEND_URL}/room/${room._id}`
                });
            }
        }
        res.json({ success: true, rooms: availableRooms });
    } catch (error) {
        console.error("Lỗi getAvailableRooms:", error);
        res.json({ success: false, message: error.message });
    }
});

export default chatbotRouter;