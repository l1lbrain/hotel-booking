import React from 'react'

const Title = ({title, description, font, align}) => {
  return (
    <div className={`flex flex-col justify-center items-center text-center ${align}`}>
        <h1 className={`text-4xl md:text-5xl font-playfair ${font}`}>{title}</h1>
        <p className='text-sm md:text-base text-gray-500 mt-2'>{description}</p>
    </div>
  )
}

export default Title