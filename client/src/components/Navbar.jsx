import React, { useState, useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import {assets} from '../assets/assets'
import {useClerk, UserButton} from '@clerk/clerk-react'
import { useAppContext } from '../context/AppContext'

const BookIcon = () => (
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
)

const Navbar = () => {
    const navLinks = [
        { name: 'TRANG CHỦ', path: '/' },
        { name: 'PHÒNG NGHỈ', path: '/rooms' },
        { name: 'BLOG', path: '/' },
        { name: 'LIÊN HỆ', path: '/' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);


    const {openSignIn} = useClerk();
    // const {user} = useUser();
    // const navigate = useNavigate();
    const location = useLocation();

    const {user, dbUser, fetchDbUser, navigate, isAdmin, axios, getToken, toast} = useAppContext();
    const [phone, setPhone] = useState(dbUser?.phone || "");
    const [address, setAddress] = useState(dbUser?.address || "");
    const [dateOfBirth, setDateOfBirth] = useState(dbUser?.dateOfBirth || "");
    
    useEffect(() => {
        // console.log(isScrolled);
        if (location.pathname != '/') {
            setIsScrolled(true);
            return;
        } else setIsScrolled(false);

        setIsScrolled(prev => location.pathname != '/' ? true : prev);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    useEffect(() => {
        if (dbUser) {
            setPhone(dbUser.phone || "");
            setAddress(dbUser.address || "");
            setDateOfBirth(dbUser.dateOfBirth || "");
        }
    }, [dbUser]);

    const handleUpdateInfo = async () => {
      try {
        const res = await axios.patch("/api/user/update-info", {
            phone,
            address,
            dateOfBirth
        } , { headers: { Authorization: `Bearer ${await getToken()}`}});

        if (res.data.success) {
            await fetchDbUser();
            setShowEditPopup(false);
            toast.success("Cập nhật thông tin thành công!");
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    return (
        <>
            {showEditPopup && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Sửa thông tin cá nhân</h2>

            <form
                onSubmit={handleUpdateInfo}
                className="flex flex-col gap-3"
            >
                <div>
                    <label className="font-medium">Số điện thoại</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div>
                    <label className="font-medium">Địa chỉ</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div>
                    <label className="font-medium">Ngày sinh</label>
                    <input
                        type="date"
                        className="w-full border p-2 rounded"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded mt-3 cursor-pointer"
                >
                    Lưu thay đổi
                </button>

                <button
                    type="button"
                    className="text-gray-600 mt-2 cursor-pointer"
                    onClick={() => setShowEditPopup(false)}
                >
                    Đóng
                </button>
            </form>
        </div>
    </div>
)}

            <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

                {/* Logo */}
                <Link to='/'>
                    {/* <img src={assets.logo} className={`h-9 ${isScrolled && "invert opacity-80"}`}>
                    </img> */}
                    <div className={`flex items-baseline ${!isScrolled && "invert"}`}>
                        <img src={assets.hotel} alt="" className={`h-10 stroke-white`}/>
                        <h1 className='text-3xl text-black font-extrabold'>HanoiHotel</h1>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-black" : "text-white"}`}>
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </a>
                    ))}
                    {user && isAdmin && (
                        <button onClick={() => {navigate('/owner'); scrollTo(0,0)}} className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'}  transition-all`}>
                        Bảng điều khiển
                        </button>
                    )}
                    
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                    <img src={assets.searchIcon} alt="search" className={`h-7 ${isScrolled && "invert"} transition-all duration-500`} />
                    
                    {user
                    ?
                    (<UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label='Đơn hàng của tôi' labelIcon={<BookIcon/>} onClick={() => navigate('/my-bookings')} ></UserButton.Action>
                            <UserButton.Action label='Thông tin cá nhân' labelIcon={<BookIcon/>} onClick={() => setShowEditPopup(true)} ></UserButton.Action>
                        </UserButton.MenuItems>
                    </UserButton>)
                    : 
                    (<button onClick={openSignIn} className={`cursor-pointer px-6 py-2.5 rounded-full ml-4 transition-all duration-200 ${isScrolled ? "text-white bg-black" : "bg-white text-black"}`}>
                        Đăng nhập
                    </button>)}

                    
                </div>

                {/* Mobile Menu Button */}
                
                <div className="flex items-center gap-3 md:hidden">
                    {user && <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label='My Booking' labelIcon={<BookIcon/>} onClick={() => navigate('/my-bookings')} ></UserButton.Action>
                        </UserButton.MenuItems>
                    </UserButton>}
                    <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="menu" className={`h-4 ${isScrolled && "invert"}`}/>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <img src={assets.closeIcon} alt="close-menu" className="h-6.5"/>
                    </button>

                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </a>
                    ))}

                    {user && isAdmin && (<button onClick={() => navigate('/owner')} className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                        Dashboard
                    </button>)}

                    {!user && <button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                        Login
                    </button>}
                </div>
            </nav>
        </>
            
    );
}

export default Navbar