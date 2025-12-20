import React, { useState, useEffect } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'

const Dashboard = () => {

    const {currency, user, getToken, axios} = useAppContext();
    const [loading, setLoading] = useState(false);

    const [dashboardData, setDashboardData] = useState({
        bookings: [],
        totalBookings: 0,
        totalRevenue: 0
    });

    const [month, setMonth] = useState("");
    const [year, setYear] = useState(new Date().getFullYear());
    const [years, setYears] = useState([]);

    // const [bookingsData, setBookingsData] = useState([]);

    const fetchBookingYears = async () => {
        try {
            const { data } = await axios.get('/api/bookings/years', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            });

            if (data.success) {
                setYears(data.years);
                // set mặc định là năm mới nhất
                // if (!year && data.years.length > 0) {
                //     setYear(new Date().getFullYear());
                // }
                // setYear(data.years[data.years.length - 1]);
            }
        } catch (error) {
            toast.error("Không lấy được danh sách năm");
            console.log(error);
        }
    };

    
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            
            const params = {};
            if (year) params.year = year;
            if (month) params.month = month;

            const {data} = await axios.get('/api/bookings/hotel', {headers: {
            Authorization: `Bearer ${await getToken()}`
            }, params: {month: month || undefined , year: year || undefined}});
            if (data.success) {
                console.log(data);
                // setDashboardData(data.dashboardData);
                // setDashboardData(data);
                setDashboardData({
                    bookings: data.bookings,
                    totalBookings: data.dashboardData.totalBookings,
                    totalRevenue: data.dashboardData.totalRevenue
                });
                // setBookingsData(data.bookings);
            }else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const confirmBooking = async (bookingId) => {
        if (!bookingId) return;
        const confirm = window.confirm("Bạn có chắc chắn muốn xác nhận đơn đặt phòng này không?");
        if (!confirm) return;
        try {
            const {data} = await axios.patch(`/api/bookings/${bookingId}/confirm`, {}, {headers: {Authorization: `Bearer ${await getToken()}`}})
            if (data.success) {
                toast.success(data.message);
                await fetchDashboardData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Có lỗi xảy ra");
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
                await fetchDashboardData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Có lỗi xảy ra");
        }
    }

    useEffect(() => {
        if (user) {
            fetchBookingYears();
            fetchDashboardData();
        }
    }, [user, month, year]);

    console.log(dashboardData);

    if (loading) {
        return <LoadingSpinner fullScreen={true} />
    }

return (
    <div>
        <Title align="items-start!" font="font-inter text-4xl!" title="Bảng điều khiển" description="Theo dõi các đơn đặt phòng và phân tích thu nhập theo thời gian thực"/>
        {/* Chọn thời gian lọc */}
        <div className="flex gap-4 mt-6">
            <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
            >
                <option value="">Tất cả tháng</option>
                {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                    Tháng {i + 1}
                </option>
                ))}
            </select>

            <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
            >
                <option value="">Tất cả năm</option>
                {years.map(y => (
                <option key={y} value={y}>{y}</option>
                ))}
            </select>
        </div>

        <div className='flex gap-4 my-8'>
            {/* Tổng đơn đặt phòng */}
            <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8 items-center'>
                <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10'/>
                <div className='flex flex-col sm:ml-4 font-medium'>
                    <p className='text-blue-500 text-md'>Tổng đơn đặt phòng</p>
                    <p className='text-neutral-500 text-base'>{dashboardData.totalBookings}</p>
                </div>
            </div>
            {/* Doanh thu */}
            <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8 items-center'>
                <img src={assets.totalRevenueIcon} alt="" className='max-sm:hidden h-10'/>
                <div className='flex flex-col sm:ml-4 font-medium'>
                    <p className='text-blue-500 text-md'>Tổng doanh thu</p>
                    <p className='text-neutral-500 text-base'>{dashboardData.totalRevenue.toLocaleString("vi-VN")}{currency}</p>
                </div>
            </div>
        </div>

        {/* Các đơn đặt phòng gần đây */}
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
                    {dashboardData.bookings.map((item) => (
                        <tr key={item._id}>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                                {item.user.username} {item.user.role === 'deleted-user' && <span className='px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded'>Đã xóa</span>}
                                <div>({item.user.phone || "Chưa có"})</div>
                            </td>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                                {item.room.roomType}
                            </td>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                                <p>{new Date(item.checkInDate).toLocaleDateString("vi-VN")} - {new Date(item.checkOutDate).toLocaleDateString("vi-VN")}</p>
                            </td>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                                {item.totalPrice.toLocaleString("vi-VN")}{currency}
                            </td>
                            <td className='py-3 px-4 border-t border-gray-300 text-center'>
                                <button className={`py-1 px-3 text-xs rounded-full mx-auto ${item.isPaid ? "bg-green-200 text-green-600" : "bg-amber-200 text-yellow-600"}`}>
                                    {item.isPaid ? "Hoàn tất" : "Chưa thanh toán"}
                                </button>
                            </td>
                            <td className='py-3 px-4 border-t border-gray-300 text-center'>
                                <button onClick={() => confirmBooking(item._id)} disabled={item.status === "Đã hủy"} hidden={item.status === "Đã hủy"} className={`py-1 px-3 mr-0.5 text-xs rounded-full mx-auto border border-green-300 cursor-pointer text-green-500 ${item.isPaid && "!bg-green-200 !text-green-600 !border-none !cursor-default"}`}>{item.isPaid ? "Hoàn tất" : "Xác nhận"}</button>
                                <button onClick={() => cancelBooking(item._id)} disabled={item.status === "Đã hủy"} hidden={item.isPaid} className={`py-1 px-3 text-xs rounded-full mx-auto border border-red-300 cursor-pointer text-red-500 ${item.status === "Đã hủy" && "!text-white bg-gray-400 border-none !cursor-default"}`}>{item.status === "Đã hủy" ? "Đã hủy" : "Hủy"}</button>
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