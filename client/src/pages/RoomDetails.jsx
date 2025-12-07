import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { useState } from 'react';
import { roomCommonData} from '../assets/assets';
import RatingStar from '../components/RatingStar';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const RoomDetails = () => {
    const {id} = useParams();
    const {rooms, getToken, axios, navigate} = useAppContext();
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [guests, setGuests] = useState(1);
    const [message, setMessage] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);

    const [showInfoPopup, setShowInfoPopup] = useState(false);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

    const checkAvailability = async () => {
      try {
        if (checkInDate >= checkOutDate) {
          toast.error("Ngày nhận phòng phải trước ngày trả phòng");
          return;
        }
        const {data} = await axios.post('/api/bookings/check-availability', {room: id, checkInDate, checkOutDate})
        if (data.success) {
          if (data.isAvailable) {
            setIsAvailable(true);
            toast.success("Phòng còn trống")
          } else {
            setIsAvailable(false);
            toast.error("Phòng đã có người đặt trước")
          }
        } else {
          toast.error(data.message)
        }
      } catch (error) {
          toast.error(error.message)
      }
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            if (!isAvailable) {
              return checkAvailability();
            }
          //Kiểm tra thông tin user trước khi đặt phòng
          const check = await axios.get(`/api/user/check-info`, {headers: {Authorization: `Bearer ${await getToken()}`}});

          if (!check.data.success) {
          //Thiếu thông tin → bật popup
            setShowInfoPopup(true);
            return;
          }

          //Đủ thông tin → đặt phòng như cũ
          const {data} = await axios.post(
            '/api/bookings/book',
            {
              room: id,
              checkInDate,
              checkOutDate,
              guests,
              paymentMethod: "Thanh toán tại quầy"
            },
            {headers: {Authorization: `Bearer ${await getToken()}`}}
          );

          if (data.success) {
              toast.success(data.message);
              navigate('/my-bookings');
              scrollTo(0, 0);
          } else {
              toast.error(data.message);
          }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleSaveUserInfo = async () => {
      try {
        const res = await axios.patch("/api/user/update-info", {
          phone,
          address,
          dateOfBirth
        } , { headers: { Authorization: `Bearer ${await getToken()}`}});

        if (res.data.success) {
          setShowInfoPopup(false);
          toast.success("Đã cập nhật thông tin. Vui lòng đặt phòng");
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    // const onSubmitHandler = async (e) => {
    //   try {
    //     e.preventDefault();
    //     if (!isAvailable) {
    //       return checkAvailability();
    //     } else {
    //       const {data} = await axios.post('/api/bookings/book', {room: id, checkInDate, checkOutDate, guests, paymentMethod: "Thanh toán tại quầy"}, {headers: {Authorization: `Bearer ${await getToken()}`}})
    //       if (data.success) {
    //         toast.success(data.message);
    //         navigate('/my-bookings');
    //         scrollTo(0, 0);
    //       } else {
    //         toast.error(data.message);
    //       }
    //     }
    //   } catch (error) {
    //         toast.error(error.message);
    //   }
    // }

    useEffect(() => {
        const room = rooms.find(room => room._id == id);
        room && setRoom(room);
        room && setMainImage(room.images[0]);
        console.log(id)
    }, [rooms]);
  return room &&(
  <>
    {showInfoPopup && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">

      <h2 className="text-xl font-semibold mb-4">
        Bổ sung thông tin
      </h2>

      <input
        type="text"
        placeholder="Số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border w-full p-2 mb-3 rounded"
      />

      <input
        type="text"
        placeholder="Địa chỉ"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border w-full p-2 mb-3 rounded"
      />

      <input
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        className="border w-full p-2 mb-4 rounded"
      />

      <div className="flex gap-3">
        <button
          className="w-1/2 bg-black text-white py-2 rounded hover:bg-black/90 cursor-pointer"
          onClick={handleSaveUserInfo}
        >
          Xác nhận
        </button>

        <button
          className="w-1/2 bg-gray-300 text-black py-2 rounded hover:bg-gray-400 cursor-pointer"
          onClick={() => setShowInfoPopup(false)}
        >
          Hủy
        </button>
      </div>

    </div>
  </div>
)}
  <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      {/* Tên phòng */}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <h1 className='text-3xl md:text-4xl font-playfair'>{room.roomType} <span className='text-lg'>({room.bedType})</span></h1>
            <p className='text-xs py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
        </div>

      {/* Room rating */}
        <div className='flex items-center gap-1 mt-2'>
          <RatingStar rating={4}/>
          <p className='ml-2'>200+ Đánh giá</p>
        </div>

      {/* Ảnh phòng */}
        <div className='flex flex-col lg:flex-row mt-6 gap-6'>
          {/* Ảnh chính */}
          <div className='lg:w-1/2 w-full'>
            <img src={mainImage} alt="Room-Images" className='w-full rounded-xl shadow-lg object-cover aspect-[5/3]'/>
          </div>
          {/* Ảnh phụ */}
          <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
            {room?.images.length > 1 && room.images.map((image, index) => (
              <img onClick={() => setMainImage(image)} key={index} src={image} alt="Room-Images" className={` aspect-[5/3] w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage == image && 'outline-3 outline-orange-500'}`}/>
            ))}
          </div>
        </div>

      {/* Mô tả */}
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
          {/* Giá phòng */}
          <p className='text-2xl font-medium'>{room.pricePerNight.toLocaleString("vi-VN")}₫/đêm</p>
        </div>
        <div className='flex justify-center'>
            <p className='w-5xl text-lg text-center font-light'>Family Room mang đến sự ấm cúng với không gian rộng rãi gồm hai phòng ngủ riêng biệt, được trang bị đầy đủ các tiện nghi. Đây sẽ là lựa chọn hoàn hảo dành cho các gia đình để tận hưởng kỳ nghỉ dưỡng thư thái và những giây phút yên bình bên nhau ngay giữa lòng Hà Nội.</p>
        </div>
      
      {/* CheckIn CheckOut Form */}
        <form onSubmit={onSubmitHandler} className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
          <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
              <div className='flex flex-col'>
                <label htmlFor="checkInDate" className='font-medium'>Nhận phòng</label>
                <input onChange={(e) => setCheckInDate(e.target.value)} min={new Date().toISOString().split('T')[0]} type="date" id='checkInDate' placeholder='Check-In' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required/>
              </div>
              <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
              <div className='flex flex-col'>
                <label htmlFor="checkOutDate" className='font-medium'>Trả phòng</label>
                <input onChange={(e) => setCheckOutDate(e.target.value)} min={checkInDate} disabled={!checkInDate} type="date" id='checkOutDate' placeholder='Check-Out' className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required/>
              </div>
              <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
              <div className='flex flex-col'>
                <label htmlFor="guests" className='font-medium'>Khách</label>
                {/* <input onChange={(e) => setGuests(e.target.value)} value={guests} type="number" min={1} max={5} id='guests' placeholder='1' className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required/> */}
                <input onChange={(e) => {let val = Number(e.target.value); if(e.target.value==="") {setGuests(""); return}; if(val<1) {setMessage("Số lượng tối thiểu là 1"); setTimeout(() => setMessage(""), 2000); val=1}; if(val>5) {setMessage("Số lượng tối đa là 5"); setTimeout(() => setMessage(""), 2000); val=5} ;setGuests(val)}} value={guests} type="number" min={1} max={5} id='guests' placeholder='1' className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required/>
                {message && (
                  <div className="text-xs text-red-500 mt-1 opacity-80">{message}</div>
                )}
              </div>

          </div>
          <button type='submit' className='bg-black hover:bg-black/90 active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>
              {isAvailable? "Đặt ngay" : "Kiểm Tra Phòng"}
          </button>
        </form>

      {/* Tiện nghi */}
      <div className='mt-16'>
        <h1 className='text-3xl md:text-4xl font-extralight'>Các tiện nghi</h1>
        <ul className='list-disc list-inside mt-6 space-y-2 text-lg font-light text-gray-700 pl-5'>
          {room.amenities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Cam kết */}
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
  </>
    
  )
}

export default RoomDetails