import React, { useEffect, useState, useRef } from 'react';
import { adminAPI } from '../../config/api';

const SLIDE_INTERVAL = 2500;

const CodeCreaftSection = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, SLIDE_INTERVAL);
      return () => clearInterval(intervalRef.current);
    }
  }, [images.length]);

  const fetchImages = async () => {
    try {
      const res = await adminAPI.getAllPortfolio();
      setImages(res.data || []);
    } catch (err) {
      setImages([]);
    }
  };

  if (images.length === 0) {
    return (
      <section className="py-12 text-center">
        <h2 className="text-3xl font-extrabold mb-4 text-blue-900">CodeCraft Portfolio</h2>
        <p className="text-gray-500">No portfolio images found.</p>
      </section>
    );
  }

  return (
    <section className="py-16 flex flex-col items-center bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-2xl w-full mx-auto text-center mb-8">
        <h2 className="text-3xl font-extrabold mb-2 text-blue-900">Crafting a Dazzling GitHub Portfolio</h2>
        <p className="text-lg text-gray-700 mb-1">Craft a powerful portfolio to impress recruiters at top-tier companies—Unicorns, Global MNCs, and Hyper-Growth Startups—ensuring impactful career opportunities.</p>
      </div>
      <div className="relative w-full max-w-md flex items-center justify-center">
        <div className="w-48 h-48 flex items-center justify-center bg-white rounded-xl shadow-lg border border-blue-100 mx-auto overflow-hidden transition-all duration-500">
          <img
            src={images[current].image}
            alt="Portfolio"
            className="w-44 h-44 object-contain rounded-lg"
            style={{ transition: 'opacity 0.5s' }}
          />
        </div>
        {/* Decorative gradient circles */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-200/30 rounded-full blur-2xl"></div>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default CodeCreaftSection;
