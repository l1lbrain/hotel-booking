import express from 'express';
import { cancelBooking, checkAvailabilityAPI, confirmBooking, createBooking, getOwnerBookings, getUserBookings, stripePayment } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/hotel', protect, getOwnerBookings);
bookingRouter.post('/stripe-payment', protect, stripePayment);
bookingRouter.patch('/:id/cancel', protect, cancelBooking);
bookingRouter.patch('/:id/confirm', protect, confirmBooking);
export default bookingRouter;