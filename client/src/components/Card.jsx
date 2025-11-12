import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Card = ({room}) => {
  return (
    <Link to={'/rooms/' + room._id} onClick={() => scrollTo(0, 0)} key={room.id} className='relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-lg' >
        <img src={room.images[0]} alt="" />
        {room.rating >= 4.5 && <p className='font-inter px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full'>Tuyệt vời</p>}
        <div className='p-4 pt-5'>
          <div className='flex items-center justify-between'>
            <p className=' text-xl font-medium text-gray-800'>{room.hotel.name}</p>
            <div className='flex items-center gap-1'>
              <img src={assets.starIconFilled} alt="star-icon" /> {room.rating}
            </div>
          </div>
          <div className='flex items-center gap-x-1 py-1'>
            <img src={room.roomType == "Double Bed" ? assets.bedIcon : assets.singleBedIcon} alt="bed-icon" className='h-5'/>
            <p>{room.roomType}</p>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <p className='text-black'>Từ <span className='text-xl text-gray-800'>{room.pricePerNight.toLocaleString("vi-VN")}₫</span></p>
            <button className='px-4 py-2 text-sm text-black font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer'>Chi tiết</button>
          </div>
        </div>
    </Link>
  )
}

export default Card