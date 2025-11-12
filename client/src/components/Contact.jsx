import React from 'react'
import Title from './Title'

const Contact = () => {
  return (
    <div className='flex justify-center'>
    <form className="flex flex-col items-center py-24">
            {/* <p className="text-lg text-blue-600 font-medium pb-2">Contact Us</p>
            <h1 className="text-4xl font-semibold text-slate-700 pb-4">Get in touch with us</h1>
            <p className="text-sm text-gray-500 text-center pb-10">Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />Lorem Ipsum has been the industry's standard dummy text.</p> */}
        <Title title={"Liên hệ với chúng tôi"} description={"Chúng tôi rất sẵn lòng lắng nghe ý kiến và giải đáp mọi thắc mắc của bạn. Hãy liên hệ với chúng tôi qua biểu mẫu dưới đây."}/>
        <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px] mt-8">
            <div className="w-full">
                <label className="text-black/70" htmlFor="name">Họ và tên</label>
                <input className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="text" required />
            </div>
            <div className="w-full">
                <label className="text-black/70" htmlFor="name">Email</label>
                <input className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="email" required />
            </div>
        </div>
        
        <div className="mt-6 w-[350px] md:w-[700px]">
            <label className="text-black/70" htmlFor="name">Lời nhắn</label>
            <textarea className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-indigo-300" required></textarea>
        </div>
        
        <button type="submit" className="mt-5 bg-black text-white h-12 w-56 px-4 rounded active:scale-95 transition cursor-pointer">Gửi</button>
    </form>
    </div>
  )
}

export default Contact