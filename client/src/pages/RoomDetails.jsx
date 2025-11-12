import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { useState } from 'react';
import { roomCommonData, roomsDummyData } from '../assets/assets';
import RatingStar from '../components/RatingStar';

const RoomDetails = () => {
    const {id} = useParams();
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);

    useEffect(() => {
        const room = roomsDummyData.find(room => room._id == id);
        room && setRoom(room);
        room && setMainImage(room.images[0]);
        console.log(id)
    }, []);
  return room &&(
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      {/* Room title */}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name} <span className='text-sm'>({room.roomType})</span></h1>
            <p className='text-xs py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
        </div>

      {/* Room rating */}
        <div className='flex items-center gap-1 mt-2'>
          <RatingStar rating={4}/>
          <p className='ml-2'>200+ Đánh giá</p>
        </div>

      {/* Room images */}
        <div className='flex flex-col lg:flex-row mt-6 gap-6'>
          {/* Main Image */}
          <div className='lg:w-1/2 w-full'>
            <img src={mainImage} alt="Room-Images" className='w-full rounded-xl shadow-lg object-cover'/>
          </div>
          {/* Other Images */}
          <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
            {room?.images.length > 1 && room.images.map((image, index) => (
              <img onClick={() => setMainImage(image)} key={index} src={image} alt="Room-Images" className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage == image && 'outline-3 outline-orange-500'}`}/>
            ))}
          </div>
        </div>

      {/* Room Details */}
        <div className='flex flex-col md:flex-row md:justify-between mt-10'>
          <div className='flex flex-col w-4xl'>
            <h1 className='text-3xl md:text-4xl font-extralight'>Nghỉ dưỡng hoàn hảo</h1>
            <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
              {/* {room.amenities.map((item, index) => (
                <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                  <img src={facilityIcons[item]} alt={item} className='w-5 h-5'/>
                  <p className='text-xs'>{item}</p>
                </div>
              ))} */}
            </div>
          </div>
          {/* Room Price */}
          <p className='text-2xl font-medium'>{room.pricePerNight.toLocaleString("vi-VN")}₫/đêm</p>
        </div>
        <div className='flex justify-center'>
            <p className='w-5xl text-lg text-center font-light'>Family Room mang đến sự ấm cúng với không gian rộng rãi gồm hai phòng ngủ riêng biệt, được trang bị đầy đủ các tiện nghi. Đây sẽ là lựa chọn hoàn hảo dành cho các gia đình để tận hưởng kỳ nghỉ dưỡng thư thái và những giây phút yên bình bên nhau ngay giữa lòng Hà Nội.</p>
        </div>
      
      {/* CheckIn CheckOut Form */}
        <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
          <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
              <div className='flex flex-col'>
                <label htmlFor="checkInDate" className='font-medium'>Nhận phòng</label>
                <input type="date" id='checkInDate' placeholder='Check-In' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required/>
              </div>
              <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
              <div className='flex flex-col'>
                <label htmlFor="checkOutDate" className='font-medium'>Trả phòng</label>
                <input type="date" id='checkOutDate' placeholder='Check-Out' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required/>
              </div>
              <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
              <div className='flex flex-col'>
                <label htmlFor="guests" className='font-medium'>Khách</label>
                <input type="number" min={1} max={5} id='guests' placeholder='0' className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required/>
              </div>

          </div>
          <button type='submit' className='bg-black hover:bg-black/90 active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>
              Kiểm Tra Phòng
          </button>
        </form>

      {/* Amenities */}
      <div className='mt-16'>
        <h1 className='text-3xl md:text-4xl font-extralight'>Các tiện nghi</h1>
        <ul className='list-disc list-inside mt-6 space-y-2 text-lg font-light text-gray-700 pl-5'>
          {room.amenities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Common Specifications */}
      <div className='mt-18 space-y-4 border-t border-gray-300 py-12'>
        <h1 className='text-3xl md:text-4xl font-extralight pb-3'>Cam kết</h1>
        {roomCommonData.map((spec, index) => (
          <div key={index} className='flex items-start gap-2 pl-5'>
            <img src={spec.icon} alt="" className='w-6.5'/>
            <div>
              <p className='text-base'>{spec.title}</p>
              <p className='text-gray-500'>{spec.description}</p>
            </div>
          </div>
        ))}
      </div>

      

    </div>
  )
}

export default RoomDetails