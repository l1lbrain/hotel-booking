import React, { useState } from 'react'
import { facilityIcons, roomsDummyData } from '../assets/assets'
import RatingStar from '../components/RatingStar';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';

const CheckBox = ({label, selected = false, onChange = () => {}}) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input type="checkbox" checked={selected} onClick={(e) => onChange(e.target.checked, label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const RadioButton = ({label, selected = false, onChange = () => {}}) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input type="radio" name='sortOptions' checked={selected} onChange={() => onChange(label)} />
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const RoomList = () => {

    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    // const [roomsPerPage, setRoomsPerPage] = useState(4);

    const roomTypes = ["Premium", "Deluxe", "Suite", "Family", "Single", "Double"];
    const priceRanges = ["Dưới 500,000", "500,000 - 1,000,000", "1,000,000 - 2,000,000", "Trên 2,000,000"];
    const sortOptions = ["Giá thấp đến cao", "Giá cao đến thấp", "Đánh giá cao đến thấp", "Mới nhất"];

    const roomsPerPage = 4;
    const totalRooms = roomsDummyData.length;
    const lastRoomIndex = currentPage * roomsPerPage;
    const firstRoomIndex = lastRoomIndex - roomsPerPage;
    const currentRooms = roomsDummyData.slice(firstRoomIndex, lastRoomIndex);

  return (
    <div className='flex flex-col lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24'>
        {/* Danh sach phong */}
        <div className='w-full md:w-[60%]'> 
            <div className='flex flex-col items-start text-left'>
                <h1 className='font-playfair text-4xl md:text-[40px]'>Tất cả các phòng</h1>
                <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>Khám phá tất cả các phòng của chúng tôi</p>
            </div>
            {currentRooms.map((room) => (
                <div key={room.id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'>
                    <img onClick={() => {navigate(`/rooms/${room._id}`); scrollTo(0,0)}} src={room.images[0]} alt="room-img" title="Xem chi tiết phòng" className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'/>
                    <div className='md:w-1/2 flex flex-col gap-2'>
                        <p onClick={() => {navigate(`/rooms/${room._id}`); scrollTo(0,0)}} className='text-gray-800 text-3xl font-playfair cursor-pointer'>{room.hotel.name}</p>
                        <div className='md:w-max flex flex-col gap-2'>
                            <div className='flex items-center'>
                                <RatingStar rating={Math.round(room.rating)}/>
                                <p className='ml-2'>200+ Đánh giá</p>
                            </div>
                        </div>
                    {/* CSVC */}
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4 overflow-hidden h-20'>
                        {room.amenities.map((item, index) => (
                            <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                                <img src={facilityIcons[item]} alt="" className='w-4 h-4'/>
                                <p className='text-xs'>{item}</p>
                            </div>
                        ))}
                    </div>
                    {/* Gia phong */}
                    <p className='text-lg text-gray-700 font-medium'><span className='text-xl text-gray-800'>{room.pricePerNight.toLocaleString('vi-VN')}₫</span> / Đêm</p>
                </div>
            </div>
            ))}
            {/* Pagination */}
            <div className='flex justify-end py-4'>
                <Pagination roomsPerPage={roomsPerPage} totalRooms={totalRooms} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
        </div>

        {/* Filter */}
        <div className='bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16'>
            <div className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${openFilter && "border-b"}`}>
                <p className='text-base font-medium text-gray-800'>BỘ LỌC</p>
                <div className='text-xs cursor-pointer'>
                    <span onClick={() => setOpenFilter(!openFilter)} className='lg:hidden'>{openFilter ? 'ẨN' : 'HIỆN'}</span>
                    <span className='hidden lg:block'>XÓA</span>
                </div>
            </div>

            <div className={`${openFilter ? "h-auto" : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
                <div className='px-5 pt-5'>
                    <p className='font-medium text-gray-800 pb-2'>Loại Phòng</p>
                    {roomTypes.map((type, index) => (
                        <CheckBox key={index} label={type}/>
                    ))}
                </div>
                <div className='px-5 pt-5'>
                    <p className='font-medium text-gray-800 pb-2'>Khoảng Giá</p>
                    {priceRanges.map((range, index) => (
                        <CheckBox key={index} label={`${range}₫`}/>
                    ))}
                </div>
                <div className='px-5 pt-5 pb-7'>
                    <p className='font-medium text-gray-800 pb-2'>Sắp Xếp Theo</p>
                    {sortOptions.map((option, index) => (
                        <RadioButton key={index} label={option}/>
                    ))}
                </div>
            </div>
        </div> 
    </div>
  )
}

export default RoomList