import express from 'express';
import "dotenv/config";
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import e from 'express';
import clerkWebhooks from './controllers/clerkWebhooks.js';

connectDB();

const app = express();
app.use(cors());

//Middleware
app.use(express.json());
app.use(clerkMiddleware())

// API cho clerk webhooks
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res) => {
    res.send('Hello World! API is working');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});