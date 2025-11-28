import React, { useState, useEffect } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'

const Dashboard = () => {

    const {currency, user, getToken, toast, axios} = useAppContext();

    const [dashboardData, setDashboardData] = useState({
        bookings: [],
        totalBookings: 0,
        totalRevenue: 0
    });

    // const [bookingsData, setBookingsData] = useState([]);

    const fetchDashboardData = async () => {
        try {
            const {data} = await axios.get('/api/bookings/hotel', {headers: {
            Authorization: `Bearer ${await getToken()}`
            }});
            if (data.success) {
                console.log(data);
                // setDashboardData(data.dashboardData);
                setDashboardData(data);
                // setBookingsData(data.bookings);
            }else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const cancelBooking = async (bookingId) => {
        if (!bookingId) return;
        const confirm = window.confirm("Bạn có chắc chắn muốn hủy đơn đặt phòng này không?");
        if (!confirm) return;
        try {
            const {data} = await axios.patch(`/api/bookings/${bookingId}/cancel`, {}, {headers: {Authorization: `Bearer ${await getToken()}`}})
            if (data.success) {
                toast.success(data.message);
                fetchDashboardData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Có lỗi xảy ra");
        }
    }

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user])

    // console.log(bookingsData);
        console.log(dashboardData);


  return dashboardData.dashboardData && (
    <div>
        <Title align="items-start!" font="font-inter text-4xl!" title="Bảng điều khiển" description="Theo dõi các đơn đặt phòng và phân tích thu nhập theo thời gian thực"/>
        <div className='flex gap-4 my-8'>
            {/* Total Bookings */}
            <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8 items-center'>
                <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10'/>
                <div className='flex flex-col sm:ml-4 font-medium'>
                    <p className='text-blue-500 text-md'>Tổng đơn đặt phòng</p>
                    <p className='text-neutral-500 text-base'>{dashboardData.dashboardData.totalBookings}</p>
                </div>
            </div>
            {/* Total Revenue */}
            <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8 items-center'>
                <img src={assets.totalRevenueIcon} alt="" className='max-sm:hidden h-10'/>
                <div className='flex flex-col sm:ml-4 font-medium'>
                    <p className='text-blue-500 text-md'>Tổng doanh thu</p>
                    <p className='text-neutral-500 text-base'>{dashboardData.dashboardData.totalRevenue.toLocaleString("vi-VN")}{currency}</p>
                </div>
            </div>
        </div>

        {/* Recent Bookings Section */}
        <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Các đơn đặt phòng gần đây</h2>
        <div className='w-full max-w-5xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
            <table className='w-full'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='py-3 px-4 text-gray-800 font-medium'>Tên khách hàng</th>
                        <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Tên phòng</th>
                        <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Thời gian</th>
                        <th className='py-3 px-4 text-gray-800 font-medium text-center'>Tổng tiền</th>
                        <th className='py-3 px-4 text-gray-800 font-medium text-center'>Trạng thái thanh toán</th>
                        <th className='py-3 px-4 text-gray-800 font-medium text-center'>Hành động</th>
                    </tr>
                </thead>
                <tbody className='text-sm'>
                    {dashboardData.bookings.map((item, index) => (
                        <tr key={index}>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                                {item.user.username} {item.user.role === 'deleted-user' ? "Đã xóa" : ""}
                            </td>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                                {item.room.roomType}
                            </td>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                                {/* <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
                                    <div>
                                        <p>Nhận phòng:</p>
                                        <p className='text-gray-500 text-sm'>{new Date(item.checkInDate).toDateString()}</p>
                                    </div>
                                    <div>
                                        <p>Trả phòng:</p>
                                        <p className='text-gray-500 text-sm'>{new Date(item.checkOutDate).toDateString()}</p>
                                    </div>
                                </div> */}
                                <p>{new Date(item.checkInDate).toLocaleDateString("vi-VN")} - {new Date(item.checkOutDate).toLocaleDateString("vi-VN")}</p>
                            </td>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                                {item.totalPrice.toLocaleString("vi-VN")}{currency}
                            </td>
                            <td className='py-3 px-4 border-t border-gray-300 flex'>
                                <button className={`py-1 px-3 text-xs rounded-full mx-auto ${item.isPaid ? "bg-green-200 text-green-600" : "bg-amber-200 text-yellow-600"}`}>
                                    {item.isPaid ? "Hoàn tất" : "Chưa thanh toán"}
                                </button>
                            </td>
                            <td className='py-3 px-4 border-t border-gray-300 text-center'>
                                <button onClick={() => cancelBooking(item._id)} disabled={item.status === "Đã hủy"} className={`py-1 px-3 text-xs rounded-full mx-auto border border-red-300 cursor-pointer text-red-500 ${item.status === "Đã hủy" && "!text-white bg-gray-400 border-none !cursor-default"}`}>{item.status === "Đã hủy" ? "Đã hủy" : "Hủy"}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Dashboard