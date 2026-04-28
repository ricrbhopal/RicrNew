import React, { useState, useEffect } from 'react';
import { MdCall, MdMenu, MdClose } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'R-Sat', path: '#' },
    { name: 'Contact', path: '#' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-white shadow-sm border-b border-gray-100'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-6 lg:gap-10">
            <Link to="/" className="flex items-center transition-transform duration-300 hover:scale-105">
              <img src="/logo-2.png" alt="RICR logo" className="h-9 w-auto object-contain" />
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.path !== '#' ? (
                    <Link
                      to={link.path}
                      className={`relative text-gray-700 font-semibold transition-all duration-300 hover:text-[#125785] group ${
                        location.pathname === link.path
                          ? 'text-[#125785]'
                          : ''
                      }`}
                    >
                      {link.name}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-[#125785] transition-all duration-300 ${
                          location.pathname === link.path
                            ? 'w-full'
                            : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        if (link.name === 'Contact') {
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="relative text-gray-700 font-semibold transition-all duration-300 hover:text-[#125785] group"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#125785] transition-all duration-300 group-hover:w-full" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Phone Number */}
            <a
              href="tel:+918889991736"
              className="hidden lg:inline-flex items-center gap-2 text-gray-700 hover:text-[#125785] transition-all duration-300 group"
            >
              <MdCall
                size={18}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-sm font-semibold">+91 8889991736</span>
            </a>

            {/* Student Login Button */}
            <button className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#125785] hover:bg-[#0f4668] text-white rounded-lg shadow-md font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#125785]/50">
              Student Login
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-[#125785] hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#125785]/50"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? (
                <MdClose size={28} className="transition-transform duration-300 rotate-0" />
              ) : (
                <MdMenu size={28} className="transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay with Smooth Transition */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          isOpen
            ? 'bg-black/40 backdrop-blur-sm pointer-events-auto'
            : 'bg-black/0 backdrop-blur-none pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-16 left-0 right-0 z-50 bg-white shadow-xl border-t border-gray-100 transition-all duration-300 ease-out ${
          isOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-5 pb-6">
            {/* Mobile Navigation Links */}
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.path !== '#' ? (
                    <Link
                      to={link.path}
                      className={`flex items-center py-3 px-3 rounded-lg text-gray-800 font-medium transition-all duration-200 hover:bg-gray-50 hover:text-[#125785] active:bg-gray-100 ${
                        location.pathname === link.path
                          ? 'text-[#125785] bg-gray-50/50'
                          : ''
                      }`}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        if (link.name === 'Contact') {
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                          setIsOpen(false);
                        }
                      }}
                      className="w-full text-left py-3 px-3 rounded-lg text-gray-800 font-medium transition-all duration-200 hover:bg-gray-50 hover:text-[#125785]"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Action Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
              <a
                href="tel:+918889991736"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-800 font-semibold transition-all duration-300"
              >
                <MdCall size={18} className="text-[#125785]" />
                <span>+91 8889991736</span>
              </a>
              <button className="w-full py-3 px-4 bg-[#125785] hover:bg-[#0f4668] rounded-lg text-white font-semibold transition-all duration-300 transform active:scale-95 shadow-md">
                Student Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;