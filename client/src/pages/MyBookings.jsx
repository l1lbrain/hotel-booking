import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { assets, userBookingsDummyData } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const MyBookings = () => {

    const {axios, getToken, user} = useAppContext();
    const [bookings, setBookings] = useState([]);

    const fetchUserBookings = async () => {
        try {
            const {data} = await axios.get('/api/bookings/user', {headers: {Authorization: `Bearer ${await getToken()}`}})
            if (data.success) {
                setBookings(data.bookings);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
                toast.error(error.message);
        }
    }

    useEffect(() => {
        if (user) {
            fetchUserBookings();
        }
    }, [user])

  return (
    <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 flex flex-col'>
        <Title font="font-inter font-extralight" title="Đơn hàng của tôi" description="Dễ dàng theo dõi và quản lý những phòng bạn đã đặt chỉ với vài cú nhấp chuột"/>

    <div className='max-w-6xl mt-8 w-full text-gray-800'>

        <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
            <div className='w-1/3'>Phòng nghỉ</div>
            <div className='w-1/3'>Thời gian</div>
            <div className='w-full'>Trạng thái</div>
        </div>

        {bookings.map((booking) => (
            <div key={booking._id} className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t'>
                {/* Room Info */}
                <div className='flex flex-col md:flex-row'>
                    <img src={booking.room.images[0]} alt="room-image" className='min-md:w-44 rounded shadow object-cover'/>
                    <div className='flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4'>
                        <p className='font-playfair text-2xl'>{booking.room.roomType}<span className='text-sm'> ({booking.room.roomType})</span></p>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <img src={assets.locationIcon} alt="location-icon"/><span>D8 Giảng Võ, Phường Giảng Võ, Hà Nội</span>
                        </div>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                            <img src={assets.guestsIcon} alt="guest-icon"/><span>Số lượng khách: {booking.guests}</span>
                        </div>
                        <p className='text-base'>Tổng tiền: {booking.totalPrice.toLocaleString("vi-VN")}₫</p>
                    </div>  
                </div>
                {/* Date  */}
                <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
                    <div>
                        <p>Nhận phòng:</p>
                        <p className='text-gray-500 text-sm'>{new Date(booking.checkInDate).toDateString()}</p>
                    </div>
                    <div>
                        <p>Trả phòng:</p>
                        <p className='text-gray-500 text-sm'>{new Date(booking.checkOutDate).toDateString()}</p>
                    </div>
                </div>
                {/* Status  */}
                <div className='flex flex-col items-start justify-center pt-3'>
                    <div className='flex items-center gap-2'>
                        <div className={`h-3 w-3 rounded-full ${booking.isPaid ? 'bg-green-500' : 'bg-red-500'}`}>
                        </div>
                        <p className={`text-sm ${booking.isPaid ? 'text-green-500' : 'text-red-500'}`}>{booking.isPaid ? "Đã thanh toán" : "Đang chờ"}</p>
                    </div>
                    {!booking.isPaid && (
                        <button className='px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-gray-50 transition-all cursor-pointer'>Thanh toán ngay</button>
                    )}
                </div>
            </div>
        ))}

    </div>
    
    </div>
  )
}

export default MyBookings