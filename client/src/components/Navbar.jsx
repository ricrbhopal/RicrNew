// import React, { useState, useEffect } from 'react';
// import { MdCall, MdMenu, MdClose } from "react-icons/md";
// import { Link, useLocation } from 'react-router-dom';
// import { useContext } from "react";
// import { LoaderContext } from "../context/loaderContext";

// const Navbar = () => {
//   const { setLoading } = useContext(LoaderContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();

//   // Handle scroll effect for navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu when route changes
// useEffect(() => {
//   setIsOpen(false);
// }, [location]);

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, [isOpen]);

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'Our Story', path: '/ourStory' },
//     { name: 'Our Programs', path: '/ourProgram' },
//     { name: 'Our People', path: '/ourPeople' },
//     { name: 'Your Future', path: '/yourFuture' },
//   ];

//   return (
//     <header
//       className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? 'bg-white/95 backdrop-blur-md shadow-lg'
//           : ''
//       }`}
//     >
//       <nav className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 md:h-20">
//           {/* Logo Section */}
//           <div className="flex items-center gap-6 lg:gap-10">
//             <Link to="/" className="flex items-center transition-transform duration-300 hover:scale-105 text-5xl font-bold text-white">
//               {/* <img src="/logo-2.png" alt="RICR logo" className="h-9 w-auto object-contain mr-15" /> */}
//               RICR
//             </Link>

//             {/* Desktop Navigation Links */}
//             <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-white">
//               {navLinks.map((link) => (
//                 <li key={link.name}>
//                   {link.path !== '#' ? (
//                     <Link
//                       to={link.path}
//                       className={`relative text-gray-700 font-semibold transition-all duration-300 hover:text-[#125785] group ${
//                         location.pathname === link.path
//                           ? 'text-[#125785]'
//                           : ''
//                       }`}
//                       onClick={() => setLoading(true)}
//                     >
//                       {link.name}
//                       <span
//                         className={`absolute -bottom-1 left-0 h-0.5 bg-[#125785] transition-all duration-300 ${
//                           location.pathname === link.path
//                             ? 'w-full group-hover:w-full'
//                             : 'w-0 group-hover:w-full'
//                         }`}
//                       />
//                     </Link>
//                   ) : (
//                     <button
//                       onClick={() => {
//                         if (link.name === 'Contact') {
//                           document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
//                         }
//                       }}
//                       className="relative text-gray-700 font-semibold transition-all duration-300 hover:text-[#125785] group"
//                     >
//                       {link.name}
//                       <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#125785] transition-all duration-300 group-hover:w-full" />
//                     </button>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center gap-3 sm:gap-4">
//             {/* Phone Number */}
//             <a
//               href="tel:+918889991736"
//               className="hidden lg:inline-flex items-center gap-2 text-gray-700 hover:text-[#125785] transition-all duration-300 group"
//             >
//               <MdCall
//                 size={18}
//                 className="transition-transform duration-300 group-hover:scale-110"
//               />
//               <span className="text-sm font-semibold">+91 8889991736</span>
//             </a>

//             {/* Student Login Button */}
//             <button className="hidden md:inline-flex items-center px-5 py-2.5 bg-[#125785] hover:bg-[#0f4668] text-white rounded-lg shadow-md font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#125785]/50">
//               Student Login
//             </button>

//             {/* Mobile Menu Button */}
//             <button
//               className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-[#125785] hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#125785]/50"
//               aria-label={isOpen ? 'Close menu' : 'Open menu'}
//               onClick={() => setIsOpen((prev) => !prev)}
//             >
//               {isOpen ? (
//                 <MdClose size={28} className="transition-transform duration-300 rotate-0" />
//               ) : (
//                 <MdMenu size={28} className="transition-transform duration-300" />
//               )}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay with Smooth Transition */}
//       <div
//         className={`fixed inset-0 z-40 transition-all duration-300 ${
//           isOpen
//             ? ' pointer-events-auto'
//             : 'bg-black/0  pointer-events-none'
//         }`}
//         onClick={() => setIsOpen(false)}
//         aria-hidden="true"
//       />

//       {/* Mobile Menu Panel */}
//       <div
//         className={`fixed top-16 left-0 right-0 z-50 bg-white shadow-xl border-t border-gray-100 transition-all duration-300 ease-out ${
//           isOpen
//             ? 'translate-y-0 opacity-100 pointer-events-auto'
//             : '-translate-y-8 opacity-0 pointer-events-none'
//         }`}
//       >
//         <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
//           <div className="p-5 pb-6">
//             {/* Mobile Navigation Links */}
//             <ul className="flex flex-col gap-1">
//               {navLinks.map((link) => (
//                 <li key={link.name}>
//                   {link.path !== '#' ? (
//                     <Link
//                       to={link.path}
//                       className={`flex items-center py-3 px-3 rounded-lg text-gray-800 font-medium transition-all duration-200 hover:bg-gray-50 hover:text-[#125785] active:bg-gray-100 ${
//                         location.pathname === link.path
//                           ? 'text-[#125785] bg-gray-50/50'
//                           : ''
//                       }`}
//                     >
//                       {link.name}
//                     </Link>
//                   ) : (
//                     <button
//                       onClick={() => {
//                         if (link.name === 'Contact') {
//                           document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
//                           setIsOpen(false);
//                         }
//                       }}
//                       className="w-full text-left py-3 px-3 rounded-lg text-gray-800 font-medium transition-all duration-200 hover:bg-gray-50 hover:text-[#125785]"
//                     >
//                       {link.name}
//                     </button>
//                   )}
//                 </li>
//               ))}
//             </ul>

//             {/* Mobile Action Buttons */}
//             <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
//               <a
//                 href="tel:+918889991736"
//                 className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-800 font-semibold transition-all duration-300"
//               >
//                 <MdCall size={18} className="text-[#125785]" />
//                 <span>+91 8889991736</span>
//               </a>
//               <button className="w-full py-3 px-4 bg-[#125785] hover:bg-[#0f4668] rounded-lg text-white font-semibold transition-all duration-300 transform active:scale-95 shadow-md">
//                 Student Login
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;




import React, { useState, useEffect } from 'react';
import { MdCall, MdMenu, MdClose, MdPerson, MdArrowForward } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { useContext } from "react";
import { LoaderContext } from "../context/loaderContext";

const Navbar = () => {
  const { setLoading } = useContext(LoaderContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();

  // Show navbar only after hero section ends
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero-section');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const heroBottom = rect.bottom + window.scrollY;
        setShowNavbar(window.scrollY >= heroBottom);
        setScrolled(window.scrollY > 10);
      } else {
        setShowNavbar(true);
        setScrolled(window.scrollY > 10);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
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
    { name: 'Our Story', path: '/ourStory' },
    { name: 'Our Programs', path: '/ourProgram' },
    { name: 'Our People', path: '/ourPeople' },
    { name: 'Your Future', path: '/yourFuture' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        showNavbar
          ? 'bg-white/98 backdrop-blur-md shadow-xl '
          : ''
      }`}
    >
      <nav className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-6 lg:gap-12">
            <Link 
              to="/" 
              onClick={() => setLoading(true)}
              className="flex items-center transition-all duration-300 hover:scale-105 group"
            >
              <span className={`text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight ${
                showNavbar ? 'text-[#125785]' : 'text-white'
              } transition-colors duration-300`}>
                RICR
              </span>
              {/* <span className={`ml-1 text-xs md:text-sm font-light ${
                scrolled ? 'text-gray-500' : 'text-white/80'
              } transition-colors duration-300`}>
                Education
              </span> */}
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`relative font-semibold transition-all duration-300 group ${
                      showNavbar
                        ? 'text-gray-700 hover:text-[#125785]'
                        : 'text-white/90 hover:text-white'
                    } ${
                      location.pathname === link.path
                        ? showNavbar ? 'text-[#125785]' : 'text-white'
                        : ''
                    }`}
                    onClick={() => setLoading(true)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Phone Number */}
            <a
              href="tel:+918889991736"
              className={`hidden lg:inline-flex items-center gap-2 transition-all duration-300 group ${
                showNavbar
                  ? 'text-gray-600 hover:text-[#125785]'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              <MdCall
                size={18}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-sm font-semibold">+91 8889991736</span>
            </a>

            {/* Student Login Button */}
            <button className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#125785]/50 ${
              showNavbar
                ? 'bg-[#125785] hover:bg-[#0f4668] text-white shadow-md'
                : 'bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20'
            }`}>
              <MdPerson size={18} />
              <span>Student Login</span>
              <MdArrowForward size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden inline-flex items-center justify-center p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#125785]/50 ${
                showNavbar
                  ? 'text-gray-700 hover:text-[#125785] hover:bg-gray-100'
                  : 'text-white hover:text-white hover:bg-white/10'
              }`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? (
                <MdClose size={24} className="transition-transform duration-300 rotate-90" />
              ) : (
                <MdMenu size={24} className="transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0  transition-all duration-300 z-40 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-16 md:top-20 left-0 right-0 bg-white shadow-2xl transition-all duration-400 ease-out z-50 ${
          isOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* User Section */}
          <div className="bg-gradient-to-r from-[#125785] to-[#1a6a9e] p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MdPerson size={24} />
              </div>
              <div>
                <p className="font-semibold text-sm">Welcome to RICR</p>
                <p className="text-xs opacity-90">Empowering Your Future</p>
              </div>
            </div>
            <button className="w-full bg-white text-[#125785] py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2">
              <MdPerson size={18} />
              Student Login
            </button>
          </div>

          <div className="p-5 pb-6">
            {/* Mobile Navigation Links */}
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`flex items-center justify-between py-3 px-4 rounded-lg text-gray-800 font-medium transition-all duration-200 hover:bg-gray-50 hover:text-[#125785] active:bg-gray-100 group ${
                      location.pathname === link.path
                        ? 'text-[#125785] bg-[#125785]/5'
                        : ''
                    }`}
                    onClick={() => setLoading(true)}
                  >
                    <span>{link.name}</span>
                    <MdArrowForward 
                      size={16} 
                      className={`opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 ${
                        location.pathname === link.path ? 'opacity-100' : ''
                      }`} 
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Action Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
              <a
                href="tel:+918889991736"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-800 font-semibold transition-all duration-300 group"
              >
                <MdCall size={18} className="text-[#125785] group-hover:scale-110 transition-transform" />
                <span>Call Us: +91 8889991736</span>
              </a>
              
              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-4 mt-2">
                <p className="text-xs text-gray-500 text-center">
                  Have questions? We're here to help!
                </p>
                <p className="text-xs text-gray-400 text-center mt-1">
                  Mon-Fri: 9AM - 6PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;