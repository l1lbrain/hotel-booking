import React, { useEffect } from 'react'
import Navbar from '../../components/hotelOwner/Navbar.jsx'
import SideBar from '../../components/hotelOwner/Sidebar.jsx'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Layout = () => {

  const {isAdmin,isLoaded ,navigate} = useAppContext();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isAdmin) {
      toast.error("Bạn không có quyền truy cập.");
      navigate('/');
    }
  }, [isAdmin]);

  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <div className='flex flex-1 h-full'>
            <SideBar/>
            <div className='flex-1 p-4 pt-10 md:px-10 h-full'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Layout