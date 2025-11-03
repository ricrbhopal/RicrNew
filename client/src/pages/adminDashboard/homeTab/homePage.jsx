import React, { useState, lazy, Suspense } from 'react';

// Use dynamic imports to avoid direct static imports at module load time
const HeroTab = lazy(() => import('./heroTab'));
const AffiliationsTab = lazy(() => import('./AffilicationTab'));
const MaestorTab = lazy(() => import('./MaestorTab'));
const ExpertsTab = lazy(() => import('./expertTab'));
const CelebrateTab = lazy(() => import('./CelebrateTab'));
const AdvertisingTab = lazy(() => import('./advertisingTab'));
const FeaturedInMediaTab = lazy(() => import('./featuredTab'));

const HomePage = () => {
  const [active, setActive] = useState('hero');

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'affiliations', label: 'Affiliation & Accreditation' },
    { id: 'maestor', label: 'Maestor' },
    { id: 'Experts', label: 'Experts' },
    { id: 'celebrate', label: 'Celebrate' },
    { id: 'advertising', label: 'Advertising' },
    { id: 'featuredInMedia', label: 'Featured In Media' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        {/* Desktop Tabs */}
        <div className="hidden lg:flex space-x-1 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex-1 px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                active === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tablet Tabs */}
        <div className="hidden md:flex lg:hidden flex-wrap gap-2 bg-white rounded-xl p-2 shadow-sm border border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                active === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.label.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-sm  cursor-pointer border border-gray-200 overflow-hidden">
        <div className="p-3 sm:p-4 md:p-6">
          <Suspense fallback={<div className="p-6 text-center text-gray-600">Loading tab...</div>}>
            {active === 'hero' && <HeroTab />}
            {active === 'advertising' && <AdvertisingTab />}
            {active === 'affiliations' && <AffiliationsTab />}
            {active === 'maestor' && <MaestorTab />}
            {active === 'Experts' && <ExpertsTab />}
            {active === 'celebrate' && <CelebrateTab />}
            {active === 'featuredInMedia' && <FeaturedInMediaTab />}
          </Suspense>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
        <div className="flex justify-around p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex flex-col items-center p-1 sm:p-2 rounded-lg min-w-[50px] sm:min-w-[60px] transition-all duration-200 cursor-pointer ${
                active === tab.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mb-0.5 sm:mb-1  ${
                active === tab.id ? 'bg-blue-600' : 'bg-transparent'
              }`} />
              <span className="text-[10px] xs:text-xs font-medium truncate max-w-[50px]  sm:max-w-[70px]">
                {tab.label.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Add padding for mobile bottom navigation */}
      <div className="h-16 sm:h-20 md:h-0"></div>
    </div>
  );
};

export default HomePage;