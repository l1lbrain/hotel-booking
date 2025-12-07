import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { checkUserInfo, getUserData, getUserProfile, updateUserInfo } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/', protect, getUserData);

userRouter.get('/profile', protect, getUserProfile);

userRouter.get('/check-info', protect, checkUserInfo);

userRouter.patch('/update-info', protect, updateUserInfo);

// userRouter.post('/store-recent-search', protect, storeRecentSearchedRooms);

export default userRouter;