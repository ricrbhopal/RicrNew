import React, { useState } from 'react';
import { MdCall, MdMenu, MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-8xl mx-auto px-12 sm:px-16 lg:px-20">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center">
              <img src="/logo-2.png" alt="RICR logo" className="h-12 w-auto" />
            </a>

            <ul className="hidden md:flex items-center gap-8 text-gray-900 text-lg">
              <Link to={"/"} className="cursor-pointer hover:text-[#125785]">Home</Link>
              <Link to={"/about"} className="cursor-pointer hover:text-[#125785]">About</Link>
              <li className="cursor-pointer hover:text-[#125785]">Courses</li>
              <li className="cursor-pointer hover:text-[#125785]">R-Sat</li>
              <li className="cursor-pointer hover:text-[#125785]">Contact</li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <a href="tel:+918889991736" className="hidden lg:inline-flex items-center gap-2 text-gray-900 hover:text-[#125785]">
              <MdCall size={18} />
              <span className="text-sm">+91 8889991736</span>
            </a>

            <button className="hidden md:inline-flex items-center px-5 py-2 bg-[#125785] hover:bg-[#0f4668] text-white rounded-lg shadow-md font-medium transition">
              Student Login
            </button>

            <button
              className="lg:hidden inline-flex items-center p-2 text-gray-900"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsOpen(prev => !prev)}
            >
              {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <div className="fixed top-20 left-0 right-0 z-50 bg-white p-6 shadow-md border-t border-gray-100">
            <ul className="flex flex-col gap-4 text-gray-900 text-lg">
              <li className="py-2 border-b border-gray-100 hover:text-[#125785]">Home</li>
              <li className="py-2 border-b border-gray-100 hover:text-[#125785]">About</li>
              <li className="py-2 border-b border-gray-100 hover:text-[#125785]">Courses</li>
              <li className="py-2 border-b border-gray-100 hover:text-[#125785]">R-Sat</li>
              <li className="py-2">Contact</li>
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <a href="tel:+918889991736" className="inline-flex items-center gap-2 text-gray-900">
                <MdCall size={18} />
                <span>+91 8889991736</span>
              </a>
              <button className="md:hidden sm:flex w-full px-4 py-3 bg-[#125785] rounded-md text-white font-medium">Student Login</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
