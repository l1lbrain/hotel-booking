import React, { useState, useEffect } from 'react'
import Title from '../../components/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useParams } from "react-router-dom";

const EditRoom = () => {

    const { id: roomId } = useParams();
    const { axios, getToken, navigate } = useAppContext();

    const [loading, setLoading] = useState(false);
    const [roomLoading, setRoomLoading] = useState(true);

    // IMAGES: có thể là URL (string) hoặc File
    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
    }); 

    // INPUTS
    const [inputs, setInputs] = useState({
        roomType: "",
        pricePerNight: 0,
        amenities: {
            'Wifi Miễn Phí': false,
            'Bữa Sáng Miễn Phí': false,
            'Phục Vụ Tận Phòng': false,
            // 'View Núi': false,
            'Bể Bơi': false,
            'Áo choàng tắm': false,
            'Máy sấy tóc': false,
            'TV & truyền hình cáp': false,
            'Điều Hòa' : false,
            'Tủ Lạnh' : false,
            'Dép Đi Trong Nhà' : false,
        }
    });

    // LOAD DATA PHÒNG KHI MỞ EDIT
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const { data } = await axios.get(`/api/rooms/${roomId}`);
                const room = data.room;

                if (!room) {
                    toast.error("Không tìm thấy phòng");
                    return;
                }

                // SET AMENITIES 
                const updatedAmenities = { ...inputs.amenities };
                room.amenities.forEach(a => {
                    if (updatedAmenities[a] !== undefined) updatedAmenities[a] = true;
                });

                // SET IMAGES (URLs cũ)
                const imageState = { 1: null, 2: null, 3: null, 4: null };
                room.images.forEach((img, idx) => {
                    if (idx < 4) imageState[idx + 1] = img;
                });

                setInputs({
                    roomType: room.roomType,
                    pricePerNight: room.pricePerNight,
                    amenities: updatedAmenities
                });

                setImages(imageState);

            } catch (err) {
                console.log(err);
                toast.error("Lỗi tải dữ liệu phòng");
            } finally {
                setRoomLoading(false);
            }
        };

        fetchRoom();
    }, []);

    // SUBMIT UPDATE
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!inputs.roomType || !inputs.pricePerNight) {
            toast.error("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("roomType", inputs.roomType);
            formData.append("pricePerNight", inputs.pricePerNight);

            // amenities
            const amenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key]);
            formData.append("amenities", JSON.stringify(amenities));

            // ảnh
            Object.keys(images).forEach(key => {
                const img = images[key];
                if (!img) return;

                if (typeof img === "string") {
                    // ảnh cũ (URL)
                    formData.append("oldImages", img);
                } else {
                    // ảnh mới
                    formData.append("images", img);
                }
            });

            const { data } = await axios.put(
                `/api/rooms/${roomId}`,
                formData,
                { headers: { Authorization: `Bearer ${await getToken()}` } }
            );

            if (data.success) {
                toast.success("Cập nhật phòng thành công!");
                navigate('/owner/list-room')
            } else {
                toast.error(data.message);
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Có lỗi khi cập nhật phòng");
        }
        finally {
            setLoading(false);
        }
    };

    if (roomLoading) return <p>Đang tải dữ liệu phòng...</p>;
    
    // UI FORM 
    return (
        <form onSubmit={onSubmitHandler}> 
            <Title 
                align="items-start!" 
                font="font-inter text-4xl!" 
                title="Chỉnh sửa phòng" 
                description="Cập nhật thông tin phòng, giá cả, tiện nghi..." 
            />

            {/* Upload Images */}
            <p className='text-gray-800 mt-10'>Ảnh phòng</p>
            <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
                {Object.keys(images).map((key) => (
                    <label htmlFor={`roomImage${key}`} key={key}>
                        
                        <img 
                            className='max-h-20 cursor-pointer opacity-80' 
                            src={
                                images[key] 
                                    ? (typeof images[key] === "string"
                                        ? images[key]
                                        : URL.createObjectURL(images[key]))
                                    : assets.uploadArea
                            } 
                            alt="" 
                        />

                        <input 
                            type="file" 
                            accept='image/*' 
                            id={`roomImage${key}`} 
                            hidden 
                            onChange={(e) => 
                                setImages({...images, [key]: e.target.files[0]})
                            }
                        />
                    </label>
                ))}
            </div>

            <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
                <div className='flex-1 max-w-48'>
                    <p className='text-gray-800 mt-4'>Loại phòng</p>
                    <select 
                        value={inputs.roomType}
                        onChange={(e) => setInputs({...inputs, roomType: e.target.value})}
                        className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'
                    >
                        <option value="" disabled>Chọn loại phòng</option>
                        <option value="Luxury Room">Luxury Room</option>
                        <option value="Family Room">Family Room</option>
                        <option value="Premium Deluxe">Premium Deluxe</option>
                        <option value="Deluxe Room">Deluxe Room</option>
                    </select>
                </div>

                <div className='mt-4 text-gray-800'>
                    <p>Giá phòng (₫)</p>
                    <input 
                        type="number" 
                        className='border border-gray-300 mt-1 rounded p-2 w-24'
                        value={inputs.pricePerNight}
                        onChange={(e) => setInputs({...inputs, pricePerNight: e.target.value})}
                    />
                </div>
            </div>

            <p className='text-gray-800 mt-4'>Các tiện nghi</p>
            <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm h-32 gap-x-10'>
                {Object.keys(inputs.amenities).map((amenity, index) => (
                    <div key={index}>
                        <input 
                            type="checkbox" 
                            id={`amenities${index + 1}`} 
                            checked={inputs.amenities[amenity]} 
                            onChange={() =>
                                setInputs({
                                    ...inputs,
                                    amenities: {
                                        ...inputs.amenities,
                                        [amenity]: !inputs.amenities[amenity]
                                    }
                                })
                            }
                        />
                        <label htmlFor={`amenities${index + 1}`}> {amenity}</label>
                    </div>
                ))}
            </div>

            <button className='bg-primary text-white px-6 py-2 rounded mt-8 cursor-pointer' disabled={loading}>
                {loading ? "Đang cập nhật..." : "Cập nhật phòng"}
            </button>
        </form>
    )
}

export default EditRoom;
