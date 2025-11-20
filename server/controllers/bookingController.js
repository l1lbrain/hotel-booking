import transporter from "../configs/nodemailer.js";
import Booking from "../models/Booking.js"
import Room from "../models/Room.js";
import stripe from "stripe";

//Kiểm tra phòng còn trống hay không
const checkAvailability = async ({checkInDate, checkOutDate, room}) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate }
        })
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
        console.error(error.message);
    }
}

//API kiểm tra trạng thái phòng POST /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const {checkInDate, checkOutDate, room} = req.body;
        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room});
        res.json({success: true, isAvailable});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


//API tạo booking mới POST /api/bookings/book
export const createBooking = async (req, res) => {
    try {
        const {checkInDate, checkOutDate, room, guests} = req.body;
        const user = req.user._id;

        //Kiểm tra trạng thái phòng
        const isAvailable = await checkAvailability({checkInDate, checkOutDate, room});
        if(!isAvailable) {
            return res.json({success: false, message: "Phòng đã được đặt trước"});
        }

        //Tính tổng tiền
        const roomData= await Room.findById(room);
        let totalPrice = roomData.pricePerNight;

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        totalPrice *= numberOfNights;

        const booking = await Booking.create({
            user,
            room,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice
        })

        //Gửi email xác nhận
        const mailInfo = {
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: "Thư xác nhận đặt phòng",
            html: 
            `
                <h2>Thông tin đặt phòng của bạn</h2>
                <p>Gửi ${req.user.username},</p>
                <p>Cảm ơn bạn đã đặt phòng của chúng tôi. Đây là thông tin phòng của bạn:</p>
                <ul>
                    <li><strong>ID: ${booking._id}</strong></li>
                    <li><strong>Tên phòng: ${roomData.roomType}</strong></li>
                    <li><strong>Địa chỉ: D8 Giảng Võ, Phường Giảng Võ, Hà Nội</strong></li>
                    <li><strong>Ngày nhận phòng: ${booking.checkInDate.toDateString()}</strong></li>
                    <li><strong>Ngày nhận phòng: ${booking.checkInDate.toDateString()}</strong></li>
                    <li><strong>Tổng tiền: ${booking.totalPrice.toLocaleString("vi-VN")}₫</strong></li>
                </ul>
                <p>Chúng tôi rất hân hạnh được chào đón bạn!</p>
                <p>Nếu bạn muốn thay đổi bất cứ thông tin nào, hãy thoải mái liên hệ với chúng tôi.</p>
            `

        }
        await transporter.sendMail(mailInfo)
        res.json({success: true, message: "Đặt phòng thành công"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Đặt phòng thất bại"});
    }
}


//API lấy tất cả booking của user GET /api/bookings/user
export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate('room user').sort({createdAt: -1});
        //Tổng đơn đặt phòng
        const totalBookings = bookings.length;
        //Tổng doanh thu
        // const totalRevenue = bookings.reduce((total, booking) => total + booking.totalPrice, 0);
        const totalRevenue = bookings.reduce((total, booking) => booking.isPaid ? (total + booking.totalPrice) : total, 0);
        res.json({success: true, bookings, dashboardData: {totalBookings, totalRevenue}});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to fetch bookings"});
    }
}

//API lấy tất cả booking của owner GET /api/bookings/owner

export const stripePayment = async (req, res) => {
    try {
        const {bookingId} = req.body;
        const booking = await Booking.findById(bookingId);
        const roomData = await Room.findById(booking.room);
        const totalPrice = booking.totalPrice;
        const { origin } = req.headers;
        
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        const line_items = [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: roomData.roomType
                    },
                    unit_amount: totalPrice * 100
                },
                quantity: 1,
            }
        ]
        //Create checkout session
        // const session = await stripeInstance.checkout.sessions.create({
        //     line_items,
        //     mode: "payment",
        //     success_url: ``,
        //     cancel_url: ,
        //     metadata: {
        //         bookingId,
        //     }
        // })

    } catch (error) {
        
    }
}