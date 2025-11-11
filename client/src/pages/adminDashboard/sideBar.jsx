import React, { useState } from "react";
import {
  MdOutlineVideoLibrary,
  MdHome,
  MdCollections,
  MdSettings,
  MdHelp,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

const SideBar = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "hero", label: "Home", icon: MdHome },
    { id: "about", label: "About", icon: MdOutlineVideoLibrary },
    { id: "courses", label: "Courses", icon: MdCollections },
    { id: "settings", label: "Settings", icon: MdSettings },
    { id: "help", label: "Help & Support", icon: MdHelp },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Collapsed Sidebar */}
      {isCollapsed ? (
        <aside className="w-16 bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300">
          {/* Header - Centered when collapsed */}
          <div className="p-4 border-b border-gray-200 flex justify-center">
            <button
              onClick={toggleSidebar}
              className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
              title="Expand sidebar"
            >
              <MdChevronRight className="text-white text-lg" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2">
            <ul className="space-y-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id} className="flex justify-center">
                    <button
                      className={`p-3 rounded-lg flex items-center justify-center transition-all duration-200 relative group ${
                        activeTab === item.id
                          ? "bg-blue-50 text-blue-700 shadow-sm"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveTab(item.id)}
                      title={item.label}
                    >
                      <Icon
                        size={20}
                        className={
                          activeTab === item.id
                            ? "text-blue-600"
                            : "text-gray-500"
                        }
                      />

                      {/* Tooltip for collapsed state */}
                      <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Expand Button at bottom */}
          <div className="p-4 border-t border-gray-200 flex justify-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600"
              title="Expand sidebar"
            >
              <MdChevronRight size={20} />
            </button>
          </div>
        </aside>
      ) : (
        /* Expanded Sidebar */
        <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300">
          {/* Header with open button (now acts as close button) */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MdOutlineVideoLibrary className="text-white text-lg" />
                </div>
                <h1 className="text-lg font-bold text-gray-800">
                  Admin Dashboard
                </h1>
              </div>

              {/* Open Button (acts as close button in expanded state) */}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600"
                title="Collapse sidebar"
              >
                <MdChevronLeft size={20} />
              </button>
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
                          ? "bg-blue-50 border border-blue-100 text-blue-700 font-semibold shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <Icon
                        size={20}
                        className={
                          activeTab === item.id
                            ? "text-blue-600"
                            : "text-gray-500"
                        }
                      />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Collapse Button at bottom */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={toggleSidebar}
              className="w-full flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <span className="text-sm">Collapse sidebar</span>
              <MdChevronLeft size={16} />
            </button>
          </div>
        </aside>
      )}
    </>
  );
};

export default SideBar;
