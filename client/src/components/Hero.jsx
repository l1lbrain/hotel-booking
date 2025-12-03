import React, {useState} from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Hero = () => {
    const [bedType, setBedType] = useState("");

    const {navigate, axios, getToken} = useAppContext();

    const onSearch = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (bedType) {
            params.append('bedType', bedType);
        }
        navigate(`/rooms?${params.toString()}`)
    }

  return (
    <div className='flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white overflow-hidden'>
        {/* <p className='bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20'>The Ultimate Hotel Experience</p> */}
        <div className=' brightness-80 bg-[url("/src/assets/banner.png")] bg-no-repeat bg-cover bg-center h-screen w-screen overflow-y-hidden'></div>
        <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] md:font-medium max-w-xl mt-4 absolute'>Hanoi Hotel</h1>
        {/* <p className='max-w-130 mt-2 text-sm md:text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit, urna ut vulputate 
        facilisis, metus justo tincidunt mauris.</p> */}

        {/* Search Form */}
        <form onSubmit={onSearch} className='bg-white/30 backdrop-blur-sm text-white rounded-md px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto absolute bottom-10 '>

            {/* <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="calendar" className='h-4'/>
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                <datalist id='destinations'>
                    {cities.map((city, i) => (
                        <option key={i} value={city}> </option>
                    ))}
                </datalist>
            </div> */}

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="bedType">Loại giường</label>
                <select
                    id="bedType"
                    value={bedType}
                    onChange={(e) => setBedType(e.target.value)}
                    className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                >
                    <option className='text-black' value="">Tất cả</option>
                    <option className='text-black' value="Giường đơn">Giường đơn</option>
                    <option className='text-black' value="Giường đôi">Giường đôi</option>
                    <option className='text-black' value="Giường cỡ lớn">Giường cỡ lớn</option>
                </select>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="calendar" className='h-4'/>
                    <label htmlFor="checkIn">Nhận phòng</label>
                </div>
                <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="calendar" className='h-4'/>
                    <label htmlFor="checkOut">Trả phòng</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Số lượng khách</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-full " placeholder="0" />
            </div>

            <button className=' group flex items-center justify-center gap-1 rounded-md bg-white py-3 px-4 text-black my-auto cursor-pointer max-md:w-full max-md:py-1 mt-3 border border-white hover:bg-transparent group duration-300' >
                <img src={assets.searchIcon} alt="searchIcon" className='h-7 invert group-hover:invert-0'/>
                <span className='group-hover:text-white'>Tìm phòng</span>
            </button>
        </form>
    </div>
  )
}

export default Hero