import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
      <Link to={"/"}>
        <div className={`flex items-baseline`}>
          <img src={assets.hotel} alt="" className={`h-10 stroke-white`} />
          <h1 className="text-3xl text-black font-extrabold">HanoiHotel</h1>
        </div>
      </Link>
      <UserButton/>
    </div>
  );
};

export default Navbar;
