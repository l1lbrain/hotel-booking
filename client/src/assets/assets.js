import logo from './logo.svg'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import roomImg1 from './roomImg1.png'
import roomImg2 from './roomImg2.png'
import roomImg3 from './roomImg3.png'
import roomImg4 from './roomImg4.png'
import regImage from './regImage.png'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";
import hotel from "./hotel.png";
import hotelIcon from "./hotelIcon.png";
import router from './router.png';
import drink from './drink.png';
import concierge from './concierge.png';
import meeting from './meeting.png';
import weights from './weights.png';
import laundry from './laundry.png';
import restaurant from './restaurant.png';
import sauna from './sauna.png';
import phoneCall from './phone-call.png';
import locationPin from './location-pin.png';
import email from './email.png';
import bathrobe from './bathrobe.png';
import hairDryer from './hair-dryer.png';
import smartTV from './smart-tv.png';
import deleteIcon from './delete.png';
import editIcon from './edit.png'
import bedIcon from './bed.png'
import singleBedIcon from './single-bed.png'

export const assets = {
    singleBedIcon,
    bedIcon,
    editIcon,
    deleteIcon,
    smartTV,
    hairDryer,
    bathrobe,
    email,
    locationPin,
    phoneCall,
    meeting,
    weights,
    laundry,
    restaurant,
    sauna,
    concierge,
    drink,
    router,
    hotelIcon,
    hotel,
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
}

export const cities = [
    "Dubai",
    "Singapore",
    "New York",
    "London",
];

// Exclusive Offers Dummy Data
export const exclusiveOffers = [
    { _id: 1, title: "Summer Escape Package", description: "Enjoy a complimentary night and daily breakfast", priceOff: 25, expiryDate: "Aug 31", image: exclusiveOfferCardImg1 },
    { _id: 2, title: "Romantic Getaway", description: "Special couples package including spa treatment", priceOff: 20, expiryDate: "Sep 20", image: exclusiveOfferCardImg2 },
    { _id: 3, title: "Luxury Retreat", description: "Book 60 days in advance and save on your stay at any of our luxury properties worldwide.", priceOff: 30, expiryDate: "Sep 25", image: exclusiveOfferCardImg3 },
]

// Testimonials Dummy Data
export const testimonials = [
    { id: 1, name: "Nguyễn Văn A", address: "Hà Nội", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", rating: 5, review: "Tôi đã sử dụng nhiều nền tảng đặt phòng trước đây, nhưng không có nền tảng nào sánh được với trải nghiệm cá nhân hóa và sự tỉ mỉ đến từng chi tiết mà HanoiHotel mang lại." },
    { id: 2, name: "Nguyễn Văn A", address: "Hải Phòng", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", rating: 4, review: "Tôi đã sử dụng nhiều nền tảng đặt phòng trước đây, nhưng không có nền tảng nào sánh được với trải nghiệm cá nhân hóa và sự tỉ mỉ đến từng chi tiết mà HanoiHotel mang lại." },
    { id: 3, name: "Nguyễn Văn A", address: "Hồ Chí Minh", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", rating: 5, review: "Tôi đã sử dụng nhiều nền tảng đặt phòng trước đây, nhưng không có nền tảng nào sánh được với trải nghiệm cá nhân hóa và sự tỉ mỉ đến từng chi tiết mà HanoiHotel mang lại." }
];

// Facility Icon
export const facilityIcons = {
    "Wifi Miễn Phí": assets.freeWifiIcon,
    "Bữa Sáng Miễn Phí": assets.freeBreakfastIcon,
    "Phục Vụ Tận Phòng": assets.roomServiceIcon,
    "View Núi": assets.mountainIcon,
    "Bể Bơi": assets.poolIcon,
    "Áo choàng tắm": assets.bathrobe,
    "Máy sấy tóc": assets.hairDryer,
    "TV & truyền hình cáp": assets.smartTV,
};

// For Room Details Page
export const roomCommonData = [
    { icon: assets.homeIcon, title: "Nơi Ở Sạch Sẽ & An Toàn", description: "Một không gian được duy trì tốt và vệ sinh chỉ dành cho bạn." },
    { icon: assets.badgeIcon, title: "Vệ Sinh Nâng Cao", description: "Chúng tôi tuân thủ các quy tắc vệ sinh nghiêm ngặt." },
    { icon: assets.locationFilledIcon, title: "Chất Lượng Tuyệt Vời", description: "90% khách đã đánh giá vị trí 5 sao." },
    { icon: assets.heartIcon, title: "Thủ Tục Check-In Nhanh Gọn", description: "Khách hàng rất hài lòng về thủ tục check-in." },
];

// User Dummy Data
export const userDummyData = {
    "_id": "user_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Nguyễn Văn A",
    "email": "user.greatstack@gmail.com",
    "image": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
    "role": "hotelOwner",
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": [
        "New York"
    ]
}

// Hotel Dummy Data
export const hotelDummyData = {
    "_id": "67f76393197ac559e4089b72",
    "name": "Family Room",
    "address": "D8 Giảng Võ, Phường Giảng Võ, Hà Nội",
    "contact": "+0123456789",
    "owner": userDummyData,
    // "city": "New York",
    "createdAt": "2025-04-10T06:22:11.663Z",
    "updatedAt": "2025-04-10T06:22:11.663Z",
    "__v": 0
}

// Rooms Dummy Data
export const roomsDummyData = [
    {
        "_id": "67f7647c197ac559e4089b96",
        "id": "0",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 1000000,
        "amenities": ["Wifi Miễn Phí", "Máy sấy tóc", "Áo choàng tắm", "TV & truyền hình cáp", "Dép đi trong nhà", "Tủ quần áo", "Trà và cà phê", "Két an toàn", "Ấm siêu tốc", "Bồn tắm, buồng tắm đứng, vòi sen và thiết bị vệ sinh thông minh"],
        "images": [roomImg1, roomImg2, roomImg3, roomImg4],
        "rating": 4.8,
        "isAvailable": true,
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "67f76452197ac559e4089b8e",
        "id": "1",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 2000000,
        "amenities": ["Wifi Miễn Phí" , "Phục Vụ Tận Phòng", "View Núi", "Bể Bơi"],
        "images": [roomImg2, roomImg3, roomImg4, roomImg1],
        "rating": 3.6,
        "isAvailable": true,
        "createdAt": "2025-04-10T06:25:22.593Z",
        "updatedAt": "2025-04-10T06:25:22.593Z",
        "__v": 0
    },
    {
        "_id": "67f76406197ac559e4089b82",
        "id": "2",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 3000000,
        "amenities": ["Wifi Miễn Phí", "Bữa Sáng Miễn Phí", "Phục Vụ Tận Phòng"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "rating": 4.2,
        "isAvailable": true,
        "createdAt": "2025-04-10T06:24:06.285Z",
        "updatedAt": "2025-04-10T06:24:06.285Z",
        "__v": 0
    },
    {
        "_id": "67f763d8197ac559e4089b7a",
        "id": "3",
        "hotel": hotelDummyData,
        "roomType": "Single Bed",
        "pricePerNight": 4000000,
        "amenities": ["Wifi Miễn Phí", "Phục Vụ Tận Phòng", "Bể Bơi"],
        "images": [roomImg4, roomImg1, roomImg2, roomImg3],
        "rating": 5,
        "isAvailable": true,
        "createdAt": "2025-04-10T06:23:20.252Z",
        "updatedAt": "2025-04-10T06:23:20.252Z",
        "__v": 0
    },
    // Test data for pagination
    {
        "_id": "67f76406197ac559e4089b82",
        "id": "4",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 3000000,
        "amenities": ["Wifi Miễn Phí", "Bữa Sáng Miễn Phí", "Phục Vụ Tận Phòng"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "rating": 4.2,
        "isAvailable": true,
        "createdAt": "2025-04-10T06:24:06.285Z",
        "updatedAt": "2025-04-10T06:24:06.285Z",
        "__v": 0
    },
    {
        "_id": "67f76406197ac559e4089b82",
        "id": "5",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 3000000,
        "amenities": ["Wifi Miễn Phí", "Bữa Sáng Miễn Phí", "Phục Vụ Tận Phòng"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "rating": 4.2,
        "isAvailable": true,
        "createdAt": "2025-04-10T06:24:06.285Z",
        "updatedAt": "2025-04-10T06:24:06.285Z",
        "__v": 0
    },
    {
        "_id": "67f76406197ac559e4089b82",
        "id": "6",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 3000000,
        "amenities": ["Wifi Miễn Phí", "Bữa Sáng Miễn Phí", "Phục Vụ Tận Phòng"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "rating": 4.2,
        "isAvailable": true,
        "createdAt": "2025-04-10T06:24:06.285Z",
        "updatedAt": "2025-04-10T06:24:06.285Z",
        "__v": 0
    },
    {
        "_id": "67f76406197ac559e4089b82",
        "id": "7",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 3000000,
        "amenities": ["Wifi Miễn Phí", "Bữa Sáng Miễn Phí", "Phục Vụ Tận Phòng"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "rating": 4.2,
        "isAvailable": true,
        "createdAt": "2025-04-10T06:24:06.285Z",
        "updatedAt": "2025-04-10T06:24:06.285Z",
        "__v": 0
    },
    {
        "_id": "67f76406197ac559e4089b82",
        "id": "8",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 3000000,
        "amenities": ["Wifi Miễn Phí", "Bữa Sáng Miễn Phí", "Phục Vụ Tận Phòng"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "rating": 4.2,
        "isAvailable": true,
        "createdAt": "2025-04-10T06:24:06.285Z",
        "updatedAt": "2025-04-10T06:24:06.285Z",
        "__v": 0
    },
    {
        "_id": "67f76406197ac559e4089b82",
        "id": "9",
        "hotel": hotelDummyData,
        "roomType": "Double Bed",
        "pricePerNight": 3000000,
        "amenities": ["Wifi Miễn Phí", "Bữa Sáng Miễn Phí", "Phục Vụ Tận Phòng"],
        "images": [roomImg3, roomImg4, roomImg1, roomImg2],
        "rating": 4.2,
        "isAvailable": true,
        "createdAt": "2025-04-10T06:24:06.285Z",
        "updatedAt": "2025-04-10T06:24:06.285Z",
        "__v": 0
    },
]


// User Bookings Dummy Data
export const userBookingsDummyData = [
    {
        "_id": "67f76839994a731e97d3b8ce",
        "user": userDummyData,
        "room": roomsDummyData[1],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-30T00:00:00.000Z",
        "checkOutDate": "2025-05-01T00:00:00.000Z",
        "totalPrice": "2.990.000",
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Stripe",
        "isPaid": true,
        "createdAt": "2025-04-10T06:42:01.529Z",
        "updatedAt": "2025-04-10T06:43:54.520Z",
        "__v": 0
    },
    {
        "_id": "67f76829994a731e97d3b8c3",
        "user": userDummyData,
        "room": roomsDummyData[0],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-27T00:00:00.000Z",
        "checkOutDate": "2025-04-28T00:00:00.000Z",
        "totalPrice": "3.990.000",
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:45.873Z",
        "updatedAt": "2025-04-10T06:41:45.873Z",
        "__v": 0
    },
    {
        "_id": "67f76810994a731e97d3b8b4",
        "user": userDummyData,
        "room": roomsDummyData[3],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-11T00:00:00.000Z",
        "checkOutDate": "2025-04-12T00:00:00.000Z",
        "totalPrice": "1.990.000",
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:20.501Z",
        "updatedAt": "2025-04-10T06:41:20.501Z",
        "__v": 0
    }
]

// Dashboard Dummy Data
export const dashboardDummyData = {
    "totalBookings": 3,
    "totalRevenue": "2.990.000",
    "bookings": userBookingsDummyData
}

// --------- SVG code for Book Icon------
/* 
const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

*/