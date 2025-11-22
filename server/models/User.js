import mongoose from "mongoose";
import Booking from "./Booking.js";

const userSchema = mongoose.Schema({
    _id: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    image: {type: String, required: true},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    recentSearchedRooms: [{type: String, required: true}],

}, {timestamps: true});


//Xóa các bookings liên quan khi user bị xóa
userSchema.pre('findOneAndDelete', async function(next) {
    try {
        const doc = await this.model.findOne(this.getFilter());
        if (doc) {
            await Booking.deleteMany({ user: doc._id });
        }
        next();
    } catch (err) {
        console.log(err.message);
        next(err);
    }
});

const User = mongoose.model('User', userSchema);

export default User;