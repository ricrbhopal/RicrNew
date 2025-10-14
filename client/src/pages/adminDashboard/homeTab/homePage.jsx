import React, { useState } from 'react';
import HeroTab from './heroTab';
import AffiliationsTab from './AffilicationTab';
import MaestorTab from './Maestor';
import SettingsTab from './settingsTab';

const HomePage = () => {
  const [active, setActive] = useState('hero');

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'affiliations', label: 'Affiliation & Accreditation' },
    { id: 'maestor', label: 'Maestor' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">


      {/* Tab Navigation */}
      <div className="mb-6 lg:mb-8">
        {/* Desktop Tabs */}
        <div className="hidden lg:flex space-x-1 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden">
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 lg:p-6">
          {active === 'hero' && <HeroTab />}
          {active === 'affiliations' && <AffiliationsTab />}
          {active === 'maestor' && <MaestorTab />}
          {active === 'settings' && <SettingsTab />}
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
        <div className="flex justify-around p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] transition-all duration-200 ${
                active === tab.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className={`w-2 h-2 rounded-full mb-1 ${
                active === tab.id ? 'bg-blue-600' : 'bg-transparent'
              }`} />
              <span className="text-xs font-medium truncate max-w-[70px]">
                {tab.label.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Add padding for mobile bottom navigation */}
      <div className="h-20 lg:h-0"></div>
    </div>
  );
};

export default HomePage;