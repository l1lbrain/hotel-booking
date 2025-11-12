import React from 'react'
import Title from './Title'
import { assets, testimonials } from '../assets/assets'
import RatingStar from './RatingStar'

const GuestReview = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30'>
        <Title title={"Đánh giá của khách hàng"} description={"Lắng nghe cảm nhận từ chính những khách hàng đã từng trải nghiệm dịch vụ của chúng tôi"}/>
        <div className="flex flex-wrap items-center gap-6 mt-20">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow max-w-sm">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {/* {Array(5).fill(0).map((_, index) => (
                                <Star key={index} filled={testimonial.rating > index} />
                            ))} */}
                            <RatingStar rating={testimonial.rating}/>
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 text-justify">"{testimonial.review}"</p>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default GuestReview