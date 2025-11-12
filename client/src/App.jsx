import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import RoomList from './pages/RoomList';
import FeatureList from './components/FeatureList';
import Footer from './components/Footer';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddRoom from './pages/hotelOwner/AddRoom';
import ListRoom from './pages/hotelOwner/ListRoom';
import EditRoom from './pages/hotelOwner/EditRoom';

const App = () => {
  const isOwner = useLocation().pathname.includes("owner");

  return (
    <div>
      {!isOwner && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/rooms' element={<RoomList/>}/>
          <Route path='/rooms/:id' element={<RoomDetails/>}/>
          <Route path='/my-bookings' element={<MyBookings/>}/>
          <Route path='/owner' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='add-room' element={<AddRoom/>}/>
            <Route path='edit-room/:id' element={<EditRoom/>} />
            <Route path='list-room' element={<ListRoom/>}/>
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App