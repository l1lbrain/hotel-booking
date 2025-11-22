import { v2 as cloudinary } from 'cloudinary';
import Room from '../models/Room.js';

//API tạo phòng mới
export const createRoom = async (req, res) => {
    try {
        const {roomType, pricePerNight, amenities} = req.body;

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
            amenities: JSON.parse(amenities),
            images
        });

        res.json({success: true, message: "Tạo phòng thành công"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
};

//API lấy tất cả phòng
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({isAvailable: true}).sort({createdAt: -1});
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
export const getOwnerRooms = async (req, res) => {
    try {
        const rooms = await Room.find({}).sort({createdAt: -1});
        res.json({success: true, rooms});
    } catch (error) {
        res.json({success: false, message: error.message});
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

//API xóa phòng
export const deleteRoom = async (req, res) => {
    try {
        const {roomId} = req.params;
        console.log(roomId);
        const deletedRoom = await Room.findByIdAndDelete(roomId);
        if (!deletedRoom) {
            return res.json({success: false, message: "Xóa phòng thất bại"});
        }
        res.json({success: true, message: "Xóa phòng thành công"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
};

//API chỉnh sửa phòng (chưa làm)
export const editRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const {roomType, pricePerNight, amenities} = req.body;

        // Lấy phòng hiện tại (để không bị mất ảnh cũ nếu user không upload ảnh mới)
        const currentRoom = await Room.findById(roomId);
        if (!currentRoom) {
            return res.json({ success: false, message: "Không tìm thấy phòng" });
        }

        let images = currentRoom.images;

        // Nếu user upload ảnh mới → upload lên Cloudinary
        if (req.files && req.files.length > 0) {
            const uploadImages = req.files.map(async (file) => {
                const response = await cloudinary.uploader.upload(file.path);
                return response.secure_url;
            });
            // Đợi upload tất cả ảnh
            images = await Promise.all(uploadImages);
        }


        await Room.findByIdAndUpdate(
            roomId,
            {
                roomType,
                pricePerNight: +pricePerNight,
                amenities: JSON.parse(amenities),
                images, // sẽ dùng ảnh mới nếu user upload, còn không thì giữ nguyên ảnh cũ
            },
            { new: true } // trả về document mới sau update
        );

        res.json({ success: true, message: "Cập nhật phòng thành công" });
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//API update phòng 
export const updateRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body;
        const roomId = req.params.roomId;

        // Lấy phòng
        const room = await Room.findById(roomId);
        if (!room) return res.json({ success: false, message: "Không tìm thấy phòng" });

        // ===== XỬ LÝ ẢNH =====
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

        // ===== CẬP NHẬT =====
        room.roomType = roomType;
        room.pricePerNight = +pricePerNight;
        room.amenities = JSON.parse(amenities);
        room.images = finalImages;

        await room.save();

        res.json({ success: true, message: "Cập nhật phòng thành công", room });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
