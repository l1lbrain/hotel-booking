import User from "../models/User.js";

// Kiểm tra xác thực người dùng

export const protect = async (req, res, next) => {
    const {userId} = req.auth;
    if (!userId) {
        res.status(401).json({success: false, message: "Unauthorized"});
    }else{
        const user = await User.findById(userId);
        req.user = user;
        next();
    }
    
};

export const requireAdmin = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({success: false, message: "Forbidden: Admins only"});
    }
    next();
}