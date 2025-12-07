import User from "../models/User.js";

//GET /api/users Lấy role
export const getUserData = async (req, res) => {
    try {
        const role = req.user.role;
        // const recentSearchedRooms = req.user.recentSearchedRooms;
        res.json({success: true, role});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// GET /api/users/profile Lấy thông tin người dùng
export const getUserProfile = async (req, res) => {
    try {
        const clerkUserId = req.auth.userId;

        const user = await User.findById(clerkUserId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Không tìm thấy user" });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/users/check-info Kiểm tra thông tin người dùng
export const checkUserInfo = async (req, res) => {
    try {
        // Lấy thông tin user từ middleware protect
        const user = req.user;

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const missingFields = [];

        if (!user.phone || user.phone.trim() === "") missingFields.push("phone");
        if (!user.address || user.address.trim() === "") missingFields.push("address");
        if (!user.dateOfBirth || user.dateOfBirth.trim() === "") missingFields.push("dateOfBirth");

        res.json({success: missingFields.length === 0, missingFields,});

    } catch (error) {
        console.log("Lỗi checkUserInfo:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// PATCH /api/users/update-info Cập nhật thông tin người dùng
export const updateUserInfo = async (req, res) => {
    const { phone, address, dateOfBirth } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                ...(phone && { phone }),
                ...(address && { address }),
                ...(dateOfBirth && { dateOfBirth }),
            },
            { new: true }
        );

        res.json({success: true, message: "Cập nhật thông tin thành công", user: updatedUser });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Lưu trữ phòng đã tìm kiếm gần đây
export const storeRecentSearchedRooms = async (req, res) => {
    try {
        const {recentSearchedRoom} = req.body;
        const user = await req.user;

        if(user.recentSearchedRooms.length < 3){
            user.recentSearchedRooms.push(recentSearchedRoom);
        }else{
            user.recentSearchedRooms.shift();
            user.recentSearchedRooms.push(recentSearchedRoom);
        }
        await user.save();
        res.json({success: true, message: "Recent searched rooms updated"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}