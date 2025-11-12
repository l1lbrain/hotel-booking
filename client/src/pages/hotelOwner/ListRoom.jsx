import React, { useState } from 'react'
import { assets, roomsDummyData } from '../../assets/assets'
import Title from '../../components/Title'
import { Link } from 'react-router-dom';


const ListRoom = () => {

    const handleDelete = () => {
        const confirm = window.confirm("Bạn có chắc chắn muốn xóa phòng này không?")
        confirm ? console.log("deleted") : console.log("canceled")
    }

    const [rooms, setRooms] = useState(roomsDummyData)

  return (
    <div className='w-full'>
        <Title align="items-start!" font="font-inter text-4xl!" title="Danh sách phòng" description="Theo dõi và quản lý tình trạng các phòng nghỉ hiện có"/>
        <p className='text-gray-500 mt-8'>Danh sách phòng</p>
        <div className='w-full max-w-4xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3'>
            <table className='w-full'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='py-3 px-4 text-gray-800 font-medium w-30'>Tên phòng</th>
                        <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Các tiện nghi & đồ dùng thiết yếu</th>
                        <th className='py-3 px-4 text-gray-800 font-medium w-28'>Giá phòng</th>
                        <th className='py-3 px-4 text-gray-800 font-medium text-center w-40'>Hành động</th>
                    </tr>
                </thead>
                <tbody className='text-sm'>
                    {rooms.map((item, index) => (
                        <tr key={index} className=''>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                                {item.hotel.name}
                            </td>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
                                {item.amenities.join(', ')}
                            </td>
                            <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
                                {item.pricePerNight.toLocaleString("vi-VN")}₫   
                            </td>
                            <td className='py-3 px-4 text-red-500 border-t border-gray-300 text-sm text-center gap-x-3 h-full'>
                                <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                                    <input type="checkbox" className='sr-only peer' checked={item.isAvailable}/>
                                    <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'></div>
                                    <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                                    <Link to={'/owner/edit-room/' + item._id} >
                                        <img src={assets.editIcon} alt="delete-icon" className='h-5 w-5 cursor-pointer'/>
                                    </Link>
                                    {/* <img src={assets.editIcon} alt="delete-icon" className='h-5 w-5 cursor-pointer'/> */}
                                    <img onClick={() => handleDelete()} src={assets.deleteIcon} alt="edit-icon" className='h-5 w-5 cursor-pointer'/>
                                </label>
                                {/* <img src={assets.deleteIcon} alt="delete-icon" className='h-5 w-5 cursor-pointer'/> */}
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