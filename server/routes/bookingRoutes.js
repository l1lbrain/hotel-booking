import express from 'express';
import { cancelBooking, checkAvailabilityAPI, confirmBooking, createBooking, getBookingYears, getOwnerBookings, getUserBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
// import { createZaloPayPayment } from '../controllers/zaloPayment.js';
import { createVNPayPayment, handleVNPayReturn,  } from '../controllers/vnpayController.js';

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/years', protect, getBookingYears);
bookingRouter.get('/hotel', protect, getOwnerBookings);
// bookingRouter.post('/stripe-payment', protect, stripePayment);
bookingRouter.patch('/:id/cancel', protect, cancelBooking);
bookingRouter.patch('/:id/confirm', protect, confirmBooking);
// bookingRouter.post('/zalopay-payment', protect, createZaloPayPayment);

//VNPay payment
bookingRouter.post("/vnpay-payment", protect, createVNPayPayment);
bookingRouter.get("/payment-success", handleVNPayReturn);

// Callback / webhook VNPay
// bookingRouter.get("/vnpay-webhook", vnpayWebhook);
export default bookingRouter;