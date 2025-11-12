import React from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'

const FeatureList = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const features = [
    {
      id: 1,
      icon: assets.router,
      label: "INTERNET",
      color: "#000000",
      hoverColor: "#000000",
    },
    {
      id: 2,
      icon: assets.drink,
      label: "ĐỒ UỐNG",
      color: "#000000",
      hoverColor: "#000000",
    },
    {
      id: 3,
      icon: assets.concierge,
      label: "PHỤC VỤ TẬN TÂM",
      color: "#000000",
      hoverColor: "#000000",
    },
    {
      id: 4,
      icon: assets.meeting,
      label: "PHÒNG HỘI NGHỊ",
      color: "#D4A574",
      hoverColor: "#D4A574",
    },
    {
      id: 5,
      icon: assets.weights,
      label: "PHÒNG GYM",
      color: "#000000",
      hoverColor: "#000000",
    },
    {
      id: 6,
      icon: assets.laundry,
      label: "GIẶT ỦI",
      color: "#000000",
      hoverColor: "#000000",
    },
    {
      id: 7,
      icon: assets.restaurant,
      label: "NHÀ HÀNG",
      color: "#000000",
      hoverColor: "#000000",
    },
    {
      id: 8,
      icon: assets.sauna,
      label: "PHÒNG XÔNG HƠI",
      color: "#000000",
      hoverColor: "#000000",
    },
  ]

  return (
    <section className="w-full min-h-full bg-white py-20 px-4 md:px-8 lg:px-16 flex flex-col items-center">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-black mb-6">Vì sao chọn chúng tôi</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Nằm ở một trong những khu vực phát triển nhanh chóng tại Hà Nội, chúng tôi mang tới những dịch vụ và trải nghiệm tuyệt vời nhất cho khách hàng.
          </p>
        </div>

        {/* Features Grid */}
        <div className="w-5xl grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-x-0 md:gap-y-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            const isHovered = hoveredIndex === index

            return (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Icon Circle */}
                <div
                  className={`relative w-32 h-32 rounded-full bg-white flex items-center justify-center mb-6 transition-all duration-300 ease-out ${
                    isHovered ? "scale-110 shadow-lg" : "shadow-md"
                  }`}
                  style={{
                    boxShadow: isHovered ? "0 20px 40px rgba(0, 0, 0, 0.1)" : "0 0 20px rgba(0, 0, 0, 0.1)",
                  }}
                >
                    <div>
                        <img src={feature.icon} alt="" className='h-[60px]'/>
                    </div>
                  {/* <IconComponent
                    size={56}
                    strokeWidth={1.5}
                    style={{
                      color: isHovered ? feature.hoverColor : feature.color,
                      transition: "color 0.3s ease-out",
                    }}
                  /> */}
                </div>

                {/* Label */}
                <h3 className="text-sm font-medium text-gray-700 tracking-wider">{feature.label}</h3>
              </div>
            )
          })}
        </div>
      </div>
      </section>
  )
}

export default FeatureList;