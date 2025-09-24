import React, { useState } from 'react';
import { MdCall, MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full sticky top-0  z-99  h-20 gap-10 flex items-center justify-between px-6 md:px-18 shadow-md bg-white">

      <div className='flex lg:gap-25 md:gap-10 '>
        <div className="flex items-center gap-2  w-[160px] ">
          <img src="logo-2.png" alt="logo" className="h-12 w-[160px]" />
        </div>

        <ul className="hidden md:flex text-[19px] w-[600px] items-center gap-12 text-gray-900 ">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Courses</li>
          <li className="cursor-pointer">R-Sat</li>
          <li className="cursor-pointer">Contact Us</li>
        </ul>
      </div>


      <div className="flex items-center gap-6">
        <a href="tel:+918889991736" className="hidden lg:flex  items-center text-gray-900 gap-2 ">
          <MdCall size={18} />
          <span>+91 8889991736</span>
        </a>

        <button className=" hidden md:flex  h-12 w-36   bg-[#125785] text-white px-5 py-2 rounded-lg shadow-[6px_6px_0px_rgba(29,78,216,0.5)] hover:shadow-[1px_1px_0px_rgba(29,78,216,0.5)] transition">
          Student Login
        </button>
      </div>
      


      <div className="lg:hidden">
        {isOpen ? (
          <MdClose size={28} className="cursor-pointer" onClick={() => setIsOpen(false)} />
        ) : (
          <MdMenu size={28} className="cursor-pointer" onClick={() => setIsOpen(true)} />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md p-6 flex flex-col gap-6 lg:hidden z-50">
          <ul className="flex flex-col gap-4 text-gray-900 font-medium">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">About</li>
            <li className="hover:text-blue-600 cursor-pointer">Courses</li>
            <li className="hover:text-blue-600 cursor-pointer">R-Set</li>
            <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
          </ul>
          <a href="tel:+918889991736" className="md:flex items-center text-gray-900 gap-2 hover:text-blue-600">
            <MdCall size={18} />
            <span>+91 8889991736</span>
          </a>
          <button className="bg-blue-800/95 h-12 md:hidden text-white px-5 py-2 rounded-lg shadow-[4px_4px_0px_rgba(29,78,216,0.5)] hover:bg-blue-900 hover:shadow-[1px_1px_0px_rgba(29,78,216,0.5)] transition">
            Student Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
