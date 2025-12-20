import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    // hotel: { type: String, required: true, ref: 'Hotel' },
    roomType: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    amenities: { type: Array, required: true },
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
    bedType: { 
        type: String, 
        enum: ["Giường đơn", "Giường đôi", "Giường cỡ lớn"], 
        required: true 
    },
    quantity: { type: Number, required: true },
}, {timestamps: true});

const Room = mongoose.model("Room", roomSchema);

export default Room;