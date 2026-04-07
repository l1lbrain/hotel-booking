import crypto from "crypto";
// import Booking from "../models/Booking.js";

import { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } from "vnpay";
import Booking from "../models/Booking.js";
import { env } from "process";
import e from "express";

export const createVNPayPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    console.log("TMN:", process.env.VNPAY_TMN_CODE);
    console.log("SECRET:", process.env.VNPAY_HASH_SECRET);
    console.log("URL:", process.env.VNPAY_URL);

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
      // vnp_ReturnUrl: `${process.env.BACKEND_URL}/api/bookings/payment-success`, // URL sau khi thanh toán
      vnp_ReturnUrl: `https://hotel-booking-backend-five-theta.vercel.app/api/bookings/payment-success`,
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
        // return res.redirect("http://localhost:5173/my-bookings?message="+encodeURIComponent(message));
        console.log(process.env.BACKEND_URL+"/api/bookings/payment-success");
        console.log(process.env.FRONTEND_URL);
        // return res.redirect(process.env.FRONTEND_URL+"/my-bookings?message="+encodeURIComponent(message));
        return res.redirect("https://hotel-booking-frontend-lovat.vercel.app/my-bookings?message="+encodeURIComponent(message));

    } else {
        const message = "Thanh toán thất bại";
        return res.redirect(process.env.FRONTEND_URL+"/my-bookings?message="+encodeURIComponent(message));
    //   return res.status(400).send("Thanh toán thất bại");
    }
    
  } catch (error) {
    console.error(error);
    console.log("Error in handleVNPayReturn:", error);
    return res.send("Lỗi handleVNPayReturn");
  }
};