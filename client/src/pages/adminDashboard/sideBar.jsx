import React from 'react';
import { MdOutlineVideoLibrary, MdHome, MdCollections, MdSettings, MdHelp } from 'react-icons/md';

const SideBar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'hero', label: 'Home', icon: MdHome },
    { id: 'about', label: 'About', icon: MdOutlineVideoLibrary },
    { id: 'collections', label: 'Collections', icon: MdCollections },
    { id: 'settings', label: 'Settings', icon: MdSettings },
    { id: 'help', label: 'Help & Support', icon: MdHelp },
    
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <MdOutlineVideoLibrary className="text-white text-lg" />
          </div>
          <h1 className="text-lg font-bold text-gray-800">Admin Dashboard</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 ${
                    activeTab === item.id 
                      ? 'bg-blue-50 border border-blue-100 text-blue-700 font-semibold shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon 
                    size={20} 
                    className={activeTab === item.id ? 'text-blue-600' : 'text-gray-500'} 
                  />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>


    </aside>
  );
};

export default SideBar;