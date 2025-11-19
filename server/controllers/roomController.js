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

//API lấy phòng the owner
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

}