import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';
import { createRoom, deleteRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post('/', upload.array('images', 4), protect, createRoom);
roomRouter.get('/', getRooms);
roomRouter.get('/owner', protect, requireAdmin, getOwnerRooms);
roomRouter.post('/toggle-availability', protect, toggleRoomAvailability);
roomRouter.delete('/delete-room/:roomId', protect, deleteRoom);

export default roomRouter;