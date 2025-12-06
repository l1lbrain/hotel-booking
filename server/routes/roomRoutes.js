import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';
import { checkRoomCanDelete, createRoom, deleteRoom, getOwnerRooms, getRoomById, getRooms, toggleRoomAvailability, updateRoom } from '../controllers/roomController.js';

const roomRouter = express.Router();

roomRouter.post('/', upload.array('images', 4), protect, createRoom);
roomRouter.get('/', getRooms);
roomRouter.get('/owner', protect, requireAdmin, getOwnerRooms);
roomRouter.post('/toggle-availability', protect, toggleRoomAvailability);
roomRouter.delete('/delete-room/:roomId', protect, deleteRoom);
roomRouter.get('/:roomId', getRoomById);
roomRouter.get('/check-delete/:roomId', protect, requireAdmin, checkRoomCanDelete);
roomRouter.put('/:roomId', upload.array('images', 4), protect, requireAdmin, updateRoom);

export default roomRouter;