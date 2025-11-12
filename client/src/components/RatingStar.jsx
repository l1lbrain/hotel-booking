import React from 'react'
import { assets } from '../assets/assets'
const RatingStar = ({rating}) => {
  return (
    <>
        {Array(5).fill(0).map((_, index) => (
            <img src={rating > index ? assets.starIconFilled : assets.starIconOutlined} alt="" className='w-4.5 h-4.5' />
        ))}
        
    </>
  )
}

export default RatingStar