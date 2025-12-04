import express from 'express';
import "dotenv/config";
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import e from 'express';
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
// import { stripeWebhooks } from './controllers/stripeWebhooks.js';
// import { zaloPayWebhook } from './controllers/zalopayWebhooks.js';
import chatbotRouter from './routes/chatbotRoute.js';

connectDB();
connectCloudinary();

const app = express();
app.use(cors());

//API lắng nghe stripe webhooks
// app.post('/api/stripe', express.raw({type: "application/json"}), stripeWebhooks);

//API lắng nghe ZaloPay webhooks
// app.post('/api/zalopay/webhook', express.json(), zaloPayWebhook);

// app.get('/payment-success', (req, res) => {
//     console.log(req.query);
// });

//Middleware
app.use(express.json());
app.use(clerkMiddleware())

// API cho clerk webhooks
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res) => {
    res.send('Hello World! API is working');
});

app.use('/api/user', userRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/chatbot', chatbotRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});