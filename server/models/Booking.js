import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { type: String, ref: "User", required: true },
    room: { type: String, ref: "Room", required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    guests: { type: Number, required: true },
    status: { type: String, enum: ["Đang chờ", "Đã thanh toán", "Đã hủy"], default: "Đang chờ" },
    paymentMethod: { type: String, required: true, default: "Thanh toán tại quầy" },
    isPaid: { type: Boolean, default: false },
    
}, {timestamps: true});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;