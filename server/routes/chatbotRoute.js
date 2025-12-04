import express from 'express';
import Room from '../models/Room.js';

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

export default chatbotRouter;