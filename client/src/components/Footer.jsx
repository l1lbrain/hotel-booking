import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div className='bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
            <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
                <div className='max-w-80'>
                    {/* <img src={} alt="logo" className='mb-4 h-8 md:h-9' /> */}
                    <div className={`flex items-baseline pb-2`}>
                        <img src={assets.hotel} alt="" className={`h-10 stroke-white`}/>
                        <h1 className='text-3xl text-black font-bold'>HanoiHotel</h1>
                    </div>
                    <p className='text-sm'>
                        Chúng tôi đặt giá trị cao nhất cho dịch vụ tốt nhất. Sự hài lòng của khách hàng là điều chúng tôi theo đuổi.
                    </p>
                    <div className='flex items-center gap-3 mt-4'>
                        {/* Instagram */}
                        <img src={assets.instagramIcon} alt="instagram-icon" />
                        {/* Facebook */}
                        <img src={assets.facebookIcon} alt="facebook-icon" />
                        {/* Twitter */}
                        <img src={assets.twitterIcon} alt="twitter-icon" />
                        {/* LinkedIn */}
                        <img src={assets.linkendinIcon} alt="linkedIn-icon" />
                    </div>
                </div>

                <div>
                    <p className='text-lg text-gray-800'>Khám Phá</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">Trang Chủ</a></li>
                        <li><a href="#">Phòng Nghỉ</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Liên Hệ</a></li>
                    </ul>
                </div>

                <div>
                    <p className='text-lg text-gray-800'>Địa Chỉ</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#" className='flex items-center'><img src={assets.locationPin} alt="" className='h-3 pr-1' />D8 Giảng Võ, Phường Giảng Võ, Hà Nội</a></li>
                        <li><a href="#" className='flex items-center'><img src={assets.phoneCall} alt="" className='h-3 pr-1'/>(+84) 24 3845 2270</a></li>
                        <li><a href="#" className='flex items-center'><img src={assets.phoneCall} alt="" className='h-3 pr-1'/>(+84) 24 3845 2270</a></li>
                        <li><a href="#" className='flex items-center'><img src={assets.email} alt="" className='h-3 pr-1'/>hanoihotel@gmail.com</a></li>
                    </ul>
                </div>

                <div className='max-w-80'>
                    <p className='text-lg text-gray-800'>Muốn Nhận Ưu Đãi?</p>
                    <p className='mt-3 text-sm'>
                        Đăng ký email của bạn với chúng tôi để nhận thông tin mới và các ưu đãi đặc biệt.
                    </p>
                    <div className='flex items-center mt-4'>
                        <input type="text" className='bg-white rounded-l border border-gray-300 h-9 px-3 outline-none' placeholder='Email' />
                        <button className='flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r'>
                            {/* Arrow icon */}
                            <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} <a href="/">HanoiHotel</a>. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Điều khoản</a></li>
                    <li><a href="#">Chính sách bảo mật</a></li>
                </ul>
            </div>
        </div>
  )
}

export default Footer