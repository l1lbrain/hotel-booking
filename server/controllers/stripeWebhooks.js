import stripe from "stripe"
import Booking from "../models/Booking.js";

export const stripeWebhooks = async (req, res) => {
    //Khởi tạo cổng stripe
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
        res.status(400).send(`Lỗi Webhook: ${error.message}`)
    }

    //Xử lý sự kiện
    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        //Lấy session metadata
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent: paymentIntentId,
        })

        const { bookingId } = session.data[0].metadata;

        await Booking.findByIdAndUpdate(bookingId, {isPaid: true, paymentMethod: "Thanh toán trực tuyến"})
    } else {
        console.log("Chưa xử lý event type: ", event.type);
    }
    res.json({received: true});
}