import { json } from "express";
import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        // Tao svix instance với clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Lấy headers svix request
        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        };

        // Xác thực headers
        await whook.verify(JSON.stringify(req.body), headers);

        // Lấy dữ liệu từ req body
        const {data, type} = req.body;

        // const userData = {
        //     _id: data.id,
        //     email: data.email_addresses[0].email_address,
        //     username: data.first_name + " " + data.last_name,
        //     image: data.image_url,
        // }

        // Xử lý sự kiện
        switch (type) {
            case "user.created": {
                // Tạo user mới trong database
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    username: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await User.create(userData);
                break;
            }

            case "user.updated": {
                // Update user trong database
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    username: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case "user.deleted": {
                // Delete user trong database
                await User.findByIdAndDelete(data.id);
                break;
            }
        
            default:
                break;
        }
        res.json({success: true, message: "Webhook received"});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

export default clerkWebhooks;