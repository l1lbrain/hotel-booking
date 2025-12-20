import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/Title'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useEffect } from 'react';


const ListRoom = () => {
    const [rooms, setRooms] = useState([])
    const {axios, getToken, isAdmin, isLoaded, currency} = useAppContext();

    // Lấy danh sách phòng 
    const fetchRooms = async () => {
        try {
            const {data} = await axios.get('/api/rooms/owner', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            });
            if (data.success) {
                console.log(data);
                setRooms(data.rooms);
            } else {
                console.log("error here")
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Chỉnh sửa trạng thái phòng
    const toggleAvailability = async (roomId) => {
        const {data} = await axios.post('/api/rooms/toggle-availability', {roomId}, {headers: {
            Authorization: `Bearer ${await getToken()}`
        }});
        if (data.success) {
            console.log(data);
            toast.success(data.message);
            fetchRooms();
        } else {
            toast.error(data.message);
        }
    }

    // Xóa phòng
    const handleDelete = async (roomId) => {
        try {
            // Kiểm tra xem phòng có thể xóa không
            const { data } = await axios.get(`/api/rooms/check-delete/${roomId}`, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });
            if (!data.success) {
                return toast.error(data.message);
            }

            // Thực hiện xóa phòng
            const confirm = window.confirm("Phòng có thể xóa. Bạn có chắc chắn muốn xóa phòng này không?");
            if (!confirm) return;
            const deleteResponse = await axios.delete(`/api/rooms/delete-room/${roomId}`, {headers: {
                Authorization: `Bearer ${await getToken()}`
            }});
            if (deleteResponse.data.success) {
                toast.success(deleteResponse.data.message);
                fetchRooms();
            } else {
                toast.error(deleteResponse.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }    
    }

    useEffect(() => {
        if(!isLoaded) return;
        if (isAdmin) {
            fetchRooms();
        }
    }, [isAdmin])

  return (
    <div className='w-full'>
        <Title align="items-start!" font="font-inter text-4xl!" title="Danh sách phòng" description="Theo dõi và quản lý tình trạng các phòng nghỉ hiện có"/>
        <p className='text-gray-500 mt-8'>Danh sách phòng</p>
        <div className='w-full max-w-6xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>
            <table className='w-full'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='py-3 px-4 text-gray-800 font-medium w-36'>Loại phòng</th>
                        <th className='py-3 px-4 text-gray-800 font-medium w-26 text-center'>Số lượng</th>
                        <th className='py-3 px-4 text-gray-800 font-medium w-20 text-center '>Trống</th>
                        <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Các tiện nghi & đồ dùng thiết yếu</th>
                        <th className='py-3 px-4 text-gray-800 font-medium w-28'>Giá phòng</th>
                        <th className='py-3 px-4 text-gray-800 font-medium text-center w-40'>Hành động</th>
                    </tr>
                </thead>
                <tbody className='text-sm'>
                    {rooms.map((item, index) => (
                        <tr key={index} className=''>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                                {item.roomType}<span className='text-sm'> ({item.bedType})</span>
                            </td>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                                {item.quantity}
                            </td>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
                                {item.quantity - item.bookedCount}
                            </td>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                                {item.amenities.join(', ')}
                            </td>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                                {item.pricePerNight.toLocaleString("vi-VN")}{currency}   
                            </td>
                            <td className='py-3 px-4 text-red-500 border-t border-gray-300 text-sm text-center gap-x-3 h-full flex items-center'>
                                <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                                    <input onChange={() => toggleAvailability(item._id)} type="checkbox" className='sr-only peer' checked={item.isAvailable}/>
                                    <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'></div>
                                    <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                                </label>
                                <Link to={'/owner/edit-room/' + item._id} >
                                    <img src={assets.editIcon} alt="delete-icon" className='h-5 w-5 cursor-pointer'/>
                                </Link> 
                                <img onClick={() => handleDelete(item._id)} src={assets.deleteIcon} alt="delete-icon" className='h-5 w-5 cursor-pointer'/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ListRoom