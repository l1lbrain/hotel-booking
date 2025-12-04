import crypto from "crypto";
// import Booking from "../models/Booking.js";

// Tạo payment URL VNPay
// export const createVNPayPayment = async (req, res) => {
//   try {
//     const { bookingId } = req.body;
//     const booking = await Booking.findById(bookingId);
//     if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

//     const tmnCode = process.env.VNPAY_TMN_CODE;
//     const secretKey = process.env.VNPAY_HASH_SECRET;
//     const vnpUrl = process.env.VNPAY_URL;
//     const ipAddr = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";

//     const amount = booking.totalPrice * 100;
//     const orderId = booking._id.toString();
//     const orderInfo = `Thanh toán đơn #${booking._id}`;
//     const returnUrl = "http://localhost:5173/my-bookings";
//     const createDate = new Date().toISOString().replace(/[-:]/g, "").slice(0, 14);

//     let vnpParams = {
//       vnp_Version: "2.1.0",
//       vnp_Command: "pay",
//       vnp_TmnCode: tmnCode,
//       vnp_Amount: amount,
//       vnp_CurrCode: "VND",
//       vnp_TxnRef: orderId,
//       vnp_OrderInfo: orderInfo,
//       vnp_OrderType: "other",
//       vnp_Locale: "vn",
//       vnp_ReturnUrl: returnUrl,
//       vnp_IpAddr: ipAddr,
//       vnp_CreateDate: createDate
//     };

//     const sortedKeys = Object.keys(vnpParams).sort();
//     const signData = sortedKeys.map(key => `${key}=${vnpParams[key]}`).join("&");

//     const hmac = crypto.createHmac("sha512", secretKey);
//     vnpParams.vnp_SecureHash = hmac.update(signData).digest("hex");

//     const queryString = new URLSearchParams(vnpParams).toString();
//     const paymentUrl = `${vnpUrl}?${queryString}`;

//     return res.json({ success: true, paymentUrl });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Xử lý callback / webhook VNPay
// export const vnpayWebhook = async (req, res) => {
//   try {
//     const vnpParams = req.query;
//     const secureHash = vnpParams.vnp_SecureHash;
//     delete vnpParams.vnp_SecureHash;

//     const sortedKeys = Object.keys(vnpParams).sort();
//     const signData = sortedKeys.map(key => `${key}=${vnpParams[key]}`).join("&");

//     const hmac = crypto.createHmac("sha512", process.env.VNP_HASH_SECRET);
//     const checkHash = hmac.update(signData).digest("hex");

//     if (secureHash === checkHash && vnpParams.vnp_ResponseCode === "00") {
//       await Booking.findByIdAndUpdate(vnpParams.vnp_TxnRef, {
//         isPaid: true,
//         status: "Đã thanh toán",
//         paymentMethod: "VNPay"
//       });
//       return res.send("Success");
//     } else {
//       return res.send("Fail");
//     }
//   } catch (error) {
//     console.error(error);
//     return res.send("Fail");
//   }
// };

import { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } from "vnpay";
import Booking from "../models/Booking.js";

export const createVNPayPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    const vnpay = new VNPay({
      tmnCode: process.env.VNPAY_TMN_CODE,
      secureSecret: process.env.VNPAY_HASH_SECRET,
      vnpayHost: process.env.VNPAY_URL,
      testMode: true,          // sandbox
      hashAlgorithm: "SHA512", // mặc định SHA512
      loggerFn: ignoreLogger   // optional
    });

    // Expire 1 ngày sau
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);

    const paymentUrl = await vnpay.buildPaymentUrl({
      vnp_Amount: booking.totalPrice,    // Số tiền thanh toán (đơn vị: VNĐ)
      vnp_IpAddr: req.ip || "127.0.0.1",
      vnp_TxnRef: booking._id.toString(),       // ID booking
    //   vnp_TxnRef: 123456789, //ID test
      vnp_OrderInfo: `Thanh toán đơn #${booking._id}`,
      vnp_OrderType: ProductCode.Other,         // Other cho booking
      vnp_ReturnUrl: "http://localhost:3000/api/bookings/payment-success", // URL sau khi thanh toán
      vnp_Locale: VnpLocale.VN,
      vnp_CreateDate: dateFormat(new Date()),
      vnp_ExpireDate: dateFormat(expireDate)
    });

    return res.status(201).json({ success: true, paymentUrl });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const handleVNPayReturn = async (req, res) => {
  try {
    const vnpay = new VNPay({
      tmnCode: process.env.VNPAY_TMN_CODE,
      secureSecret: process.env.VNPAY_HASH_SECRET,
      vnpayHost: process.env.VNPAY_URL,
      testMode: true,          // sandbox
      hashAlgorithm: "SHA512", // mặc định SHA512
      loggerFn: ignoreLogger   // optional
    });

    const vnpParams = req.query;
    console.log("VNPay Return Params:", vnpParams);

    const isValid = vnpay.verifyReturnUrl(vnpParams);
    if (isValid && vnpParams.vnp_ResponseCode === "00") {
      await Booking.findByIdAndUpdate(vnpParams.vnp_TxnRef, {
        isPaid: true,
        status: "Đã thanh toán",
        paymentMethod: "VNPay"
      });
    //   return res.send("Success");
        const message = "Thanh toán thành công";
        return res.redirect("http://localhost:5173/my-bookings?message="+encodeURIComponent(message));
    } else {
        const message = "Thanh toán thất bại";
        return res.redirect("http://localhost:5173/my-bookings?message="+encodeURIComponent(message));
    //   return res.status(400).send("Thanh toán thất bại");
    }
    
  } catch (error) {
    console.error(error);
    return res.send("Lỗi handleVNPayReturn");
  }
};