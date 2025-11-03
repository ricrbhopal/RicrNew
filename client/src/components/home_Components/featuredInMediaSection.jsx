import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../config/api';
import { 
  MdClose, 
  MdNavigateBefore, 
  MdNavigateNext,
  MdSearch,
  MdOpenInNew,
  MdPause,
  MdPlayArrow
} from 'react-icons/md';

const FeaturedInMediaSection = () => {
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    let interval;
    if (modalOpen && autoPlay && !isHovering && images.length > 1) {
      interval = setInterval(() => {
        nextImage();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [modalOpen, autoPlay, isHovering, images.length]);

  const fetchImages = async () => {
    try {
      const res = await adminAPI.getAllFeaturedInMedia();
      // Only show items with image and status active
      setImages((res.data || []).filter(item => item.image && item.status === 'active'));
    } catch (err) {
      setImages([]);
    }
  };

  const openModal = idx => {
    setCurrentIndex(idx);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setAutoPlay(true);
  };

  const prevImage = () => {
    setCurrentIndex(i => (i === 0 ? images.length - 1 : i - 1));
  };

  const nextImage = () => {
    setCurrentIndex(i => (i === images.length - 1 ? 0 : i + 1));
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
  
          <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            Featured In Media
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Recognized and featured across leading media platforms and prestigious publications worldwide.
          </p>
        </div>

        {/* Media Grid */}
        {images.length > 0 ? (
          <div className="relative">
            <div className="flex flex-wrap justify-center gap-6 items-center">
              {images.map((item, idx) => (
                <div key={item._id} className="relative group flex items-center justify-center">
                  <img
                    src={item.image}
                    alt="Featured In Media"
                    className="w-100 h-80 object-cover rounded-xl shadow cursor-pointer hover:scale-105 transition-transform mx-auto"
                    onClick={() => {
                      console.log('Image clicked:', idx);
                      openModal(idx);
                    }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <MdSearch className="text-white text-4xl bg-black/50 rounded-full p-2" />
                  </span>
                </div>
              ))}
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl"></div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MdOpenInNew className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Media Features Yet</h3>
              <p className="text-gray-600">Media features will appear here once they are added and activated.</p>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {modalOpen && images.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div 
            className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-6 bg-gradient-to-b from-black/50 to-transparent">
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAutoPlay(!autoPlay);
                  }}
                  className="bg-black/60 text-white p-3 rounded-2xl hover:bg-black/80 transition-all duration-200 backdrop-blur-sm"
                >
                  {autoPlay ? <MdPause size={20} /> : <MdPlayArrow size={20} />}
                </button>
                <span className="text-white font-medium bg-black/40 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
              
              <button
                onClick={closeModal}
                className="bg-black/60 text-white p-3 rounded-2xl hover:bg-black/80 transition-all duration-200 backdrop-blur-sm hover:scale-110"
              >
                <MdClose size={20} />
              </button>
            </div>

            {/* Main Image in Modal */}
            <div className="flex items-center justify-between">
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 text-white p-4 rounded-2xl hover:bg-black/80 transition-all duration-200 backdrop-blur-sm hover:scale-110 ml-4"
              >
                <MdNavigateBefore size={28} />
              </button>
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={images[currentIndex].image}
                  alt="Featured In Media"
                  className="max-h-[70vh] object-contain rounded-xl mx-auto"
                />
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/60 text-white p-4 rounded-2xl hover:bg-black/80 transition-all duration-200 backdrop-blur-sm hover:scale-110 mr-4"
              >
                <MdNavigateNext size={28} />
              </button>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/50 to-transparent">
              {images[currentIndex].MediaUrl && (
                <div className="text-center">
                  <a
                    href={images[currentIndex].MediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl hover:bg-white/30 transition-all duration-200 border border-white/30 hover:border-white/50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>View Publication</span>
                    <MdOpenInNew size={16} />
                  </a>
                </div>
              )}
              
              {/* Thumbnail Navigation */}
              {images.length > 1 && (
                <div className="flex justify-center gap-3 mt-4">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); goToImage(idx); }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === currentIndex 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedInMediaSection;