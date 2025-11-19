import React, { useEffect, useState } from 'react'
import Title from '../../components/Title';
import { assets, roomsDummyData } from '../../assets/assets';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const EditRoom = () => {
    const {id} = useParams();
    const {user, getToken, axios} = useAppContext();

    const [images, setImages] = useState({
            1: null,
            2: null,
            3: null,
            4: null, 
        }); 
    
    const [inputs, setInputs] = useState({
        roomType: "",
        pricePerNight: "0",
        amenities: {
            'Wifi Miễn Phí' : false,
            'Bữa Sáng Miễn Phí' : false,
            'Phục Vụ Tận Phòng' : false,
            'View Núi' : false,
            'Bể Bơi' : false,
            'Áo choàng tắm' : false,
            'Máy sấy tóc' : false,
            'TV & truyền hình cáp' : false,
        }
    })


    useEffect(() => {
        const room = roomsDummyData.find(room => room._id == id);
            room && setInputs({...inputs, pricePerNight: room.pricePerNight.toLocaleString("vi-VN"), roomType: room.hotel.name})
            console.log(inputs.pricePerNight)
            console.log(id)
    }, [])
    
  return (
    <div>
        <form>
        <Title align="items-start!" font="font-inter text-4xl!" title="Sửa thông tin phòng" description={`Chỉnh sửa thông tin phòng [${inputs.roomType}]`} />
        {/* Upload Images */}
        <p className='text-gray-800 mt-10'>Ảnh phòng</p>
        <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
            {Object.keys(images).map((key) => (
                <label htmlFor={`roomImage${key}`} key={key}>
                    <img className='max-h-20 cursor-pointer opacity-80' src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
                    <input type="file" accept='image/*' id={`roomImage${key}`} hidden onChange={(e) => setImages({...images, [key]: e.target.files[0]})}/>
                </label>
            ))}
        </div>

        <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
            <div className='flex-1 max-w-48'>
                <p className='text-gray-800 mt-4'>Loại phòng</p>
                <select value={inputs.roomType} onChange={(e) => setInputs({...inputs, roomType: e.target.value})} className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
                    <option value="Luxury Room">Luxury Room</option>
                    <option value="Family Room">Family Room</option>
                    <option value="Premium Deluxe">Premium Deluxe</option>
                    <option value="Deluxe Room">Deluxe Room</option>
                </select>
            </div>
            <div className='mt-4 text-gray-800'>
                <p>Giá phòng (₫)</p>
                <input type="text" placeholder='0' className='border border-gray-300 mt-1 rounded p-2 w-28' value={inputs.pricePerNight} onChange={(e) => setInputs({...inputs, pricePerNight: e.target.value})}/>
            </div>
        </div>
        
        <p className='text-gray-800 mt-4'>Các tiện nghi</p>
        <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm h-32 gap-x-10'>
            {Object.keys(inputs.amenities).map((amenity, index) => (
                <div key={index}>
                    <input type="checkbox" id={`amenities${index + 1}`} checked={inputs.amenities[amenity]} onChange={() => setInputs({...inputs, amenities: {...inputs.amenities, [amenity]: !inputs.amenities[amenity]}})} />
                    <label htmlFor={`amenities${index + 1}`}> {amenity}</label>
                </div>
            ))}
        </div>
        <button onClick={() => handleEdit()} className='bg-primary text-white px-6 py-2 rounded mt-8 cursor-pointer'>Thay đổi</button>
    </form>
    </div>
  )
}

export default EditRoom