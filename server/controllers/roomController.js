import { v2 as cloudinary } from 'cloudinary';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';

//API tạo phòng mới
export const createRoom = async (req, res) => {
    try {
        const {roomType, pricePerNight, amenities, bedType, quantity} = req.body;

        //Kiểm tra trùng
        const parsedAmenities = JSON.parse(amenities);

        //Kiểm tra phòng trùng
        const existingRoom = await Room.findOne({
            roomType,
            bedType,
            pricePerNight: +pricePerNight,
            quantity: +quantity,
            amenities: { $all: parsedAmenities, $size: parsedAmenities.length }
        });

        if (existingRoom) {
            return res.json({
                success: false,
                message: "Phòng với thông tin tương tự đã tồn tại"
            });
        }

        // Up ảnh lên cloudinary
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        })

        // Đợi upload tất cả ảnh
        const images = await Promise.all(uploadImages);

        await Room.create({
            roomType,
            pricePerNight: +pricePerNight,
            quantity: +quantity,
            amenities: JSON.parse(amenities),
            bedType,
            images
        });

        res.json({success: true, message: "Tạo phòng thành công"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
};

//API lấy tất cả phòng (có thể lọc theo loại giường hoặc ngày nhận/trả phòng)
export const getRooms = async (req, res) => {
    try {
        const {bedType, checkInDate, checkOutDate} = req.query;
        let filter = {isAvailable: true};

        // Lọc theo loại giường nếu có
        if (bedType) {
            filter.bedType = bedType;
        }
        let rooms = await Room.find(filter).sort({createdAt: -1});

        // Lọc theo ngày nhận/trả phòng nếu có
        if (checkInDate && checkOutDate) {

            // Lấy tất cả booking trong khoảng thời gian khách chọn
            const booked = await Booking.find({
                status: { $in: ["Đang chờ", "Đã thanh toán"] },
                $and: [
                    { checkInDate: { $lte: checkOutDate } },
                    { checkOutDate: { $gte: checkInDate } }
                ]
            });

            // // Danh sách phòng đã được đặt
            // const bookedRoomIds = booked.map(b => b.room.toString());

            // // Lọc các phòng KHÔNG nằm trong danh sách booked
            // rooms = rooms.filter(room => !bookedRoomIds.includes(room._id.toString()));

            // Đếm số lượng phòng đã được đặt cho mỗi loại phòng
            const bookingCount = {};
            booked.forEach(b => {
                const key = b.room.toString();
                bookingCount[key] = (bookingCount[key] || 0) + 1;
            });

            rooms = rooms.filter(room => {
                const booked = bookingCount[room._id] || 0;
                return booked < room.quantity;
            });
        }
        res.json({success: true, rooms});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
};

//API lấy phòng theo id
export const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);

        if (!room) {
            return res.json({ success: false, message: "Không tìm thấy phòng" });
        }

        res.json({ success: true, room });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


//API lấy phòng trang quản lý phòng
// export const getOwnerRooms = async (req, res) => {
//     try {
//         const rooms = await Room.find({}).sort({createdAt: -1});
//         res.json({success: true, rooms});
//     } catch (error) {
//         res.json({success: false, message: error.message});
//     }
// };
// export const getOwnerRooms = async (req, res) => {
//     try {
//         // Lấy tất cả phòng
//         const rooms = await Room.find({}).sort({ createdAt: -1 });

//         // Lấy các booking vẫn còn hiệu lực (chưa checkout)
//         const activeBookings = await Booking.find({
//             status: { $in: ["Đang chờ", "Đã thanh toán"] },
//             checkInDate: { $lte: new Date() },
//             checkOutDate: { $gte: new Date() }
//         });

//         // Nhóm booking theo roomId
//         const bookingCount = {};
//         activeBookings.forEach(b => {
//             const key = b.room.toString();
//             bookingCount[key] = (bookingCount[key] || 0) + 1;
//         });

//         // Gắn bookedCount vào từng phòng
//         const roomsWithCount = rooms.map(room => ({
//             ...room.toObject(),
//             bookedCount: bookingCount[room._id] || 0
//         }));

//         res.json({ success: true, rooms: roomsWithCount });

//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

export const getOwnerRooms = async (req, res) => {
  try {
    // Lấy tất cả phòng
    const rooms = await Room.find({}).sort({ createdAt: -1 });

    // Tính ngày hiện tại (bằng Date() là OK; nếu cần timezone chính xác hơn, normalize to start-of-day)
    // const now = new Date("12-20-2025");
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    // Lấy tất cả booking hiện đang chiếm chỗ vào ngày hôm nay
    const activeBookings = await Booking.find({
        status: { $in: ["Đang chờ", "Đã thanh toán"]},
        // checkInDate: { $lte: endOfDay },
        checkOutDate: { $gte: startOfDay }
    });

    // Nhóm booking theo roomId
    const bookingCount = {};
    activeBookings.forEach(b => {
      const key = b.room.toString();
      bookingCount[key] = (bookingCount[key] || 0) + 1;
    });

    // Gắn bookedCount vào từng phòng
    const roomsWithCount = rooms.map(room => ({
      ...room.toObject(),
      bookedCount: bookingCount[room._id.toString()] || 0
    }));

    res.json({ success: true, rooms: roomsWithCount });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//API bật/tắt trạng thái phòng
export const toggleRoomAvailability = async (req, res) => {
    try {
        const {roomId} = req.body;
        console.log(roomId);
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({success: true, message: "Đổi trạng thái phòng thành công"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
};

//API Kiểm tra phòng trước khi xóa
export const checkRoomCanDelete = async (req, res) => {
    try {
        const {roomId} = req.params;
        const existingBooking = await Booking.findOne({ room: roomId });
        if (existingBooking) {
            return res.json({success: false, message: "Không thể xóa phòng vì đã có lịch sử đặt phòng"
            });
        }
        res.json({success: true,message: "Phòng có thể xóa"});
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//API xóa phòng
export const deleteRoom = async (req, res) => {
    try {
        const {roomId} = req.params;
        console.log(roomId);
        // Xóa phòng nếu không có đơn đặt phòng hoạt động
        const deletedRoom = await Room.findByIdAndDelete(roomId);
        if (!deletedRoom) {
            return res.json({success: false, message: "Xóa phòng thất bại. Phòng không tồn tại"});
        }
        res.json({success: true, message: "Xóa phòng thành công"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
};

//API chỉnh sửa phòng (chưa làm)
// export const editRoom = async (req, res) => {
//     try {
//         const roomId = req.params.id;
//         const {roomType, pricePerNight, amenities} = req.body;

//         // Lấy phòng hiện tại (để không bị mất ảnh cũ nếu user không upload ảnh mới)
//         const currentRoom = await Room.findById(roomId);
//         if (!currentRoom) {
//             return res.json({ success: false, message: "Không tìm thấy phòng" });
//         }

//         let images = currentRoom.images;

//         // Nếu user upload ảnh mới → upload lên Cloudinary
//         if (req.files && req.files.length > 0) {
//             const uploadImages = req.files.map(async (file) => {
//                 const response = await cloudinary.uploader.upload(file.path);
//                 return response.secure_url;
//             });
//             // Đợi upload tất cả ảnh
//             images = await Promise.all(uploadImages);
//         }


//         await Room.findByIdAndUpdate(
//             roomId,
//             {
//                 roomType,
//                 pricePerNight: +pricePerNight,
//                 amenities: JSON.parse(amenities),
//                 images, // sẽ dùng ảnh mới nếu user upload, còn không thì giữ nguyên ảnh cũ
//             },
//             { new: true } // trả về document mới sau update
//         );

//         res.json({ success: true, message: "Cập nhật phòng thành công" });
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message});
//     }
// }

//API update phòng 
export const updateRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities, bedType, quantity } = req.body;
        const roomId = req.params.roomId;

        // Lấy phòng
        const room = await Room.findById(roomId);
        if (!room) return res.json({ success: false, message: "Không tìm thấy phòng" });

        // Xử lý ảnh
        let finalImages = [];

        // 1. Ảnh cũ (URL)
        if (req.body.oldImages) {
            if (Array.isArray(req.body.oldImages)) {
                finalImages.push(...req.body.oldImages);
            } else {
                finalImages.push(req.body.oldImages);
            }
        }

        // 2. Ảnh mới upload
        if (req.files && req.files.length > 0) {
            const uploaded = await Promise.all(
                req.files.map(async (file) => {
                    const uploadResult = await cloudinary.uploader.upload(file.path);
                    return uploadResult.secure_url;
                })
            );
            finalImages.push(...uploaded);
        }

        // Cập nhật thông tin phòng 
        room.roomType = roomType;
        room.pricePerNight = +pricePerNight;
        room.quantity = +quantity;
        room.amenities = JSON.parse(amenities);
        room.images = finalImages;
        room.bedType = bedType;

        await room.save();

        res.json({ success: true, message: "Cập nhật phòng thành công", room });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
