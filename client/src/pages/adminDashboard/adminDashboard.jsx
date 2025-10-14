import React, { useState } from 'react';
import SideBar from './sideBar';
import HomePage from './homeTab/homePage.jsx';
import AboutPage from './SilderTab/aboutTab.jsx';

const AdminDashboard = () => {
	const [activeTab, setActiveTab] = useState('hero');

	return (
		<div className="flex h-screen mt-20">
			<SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
			<main className="flex-1 bg-gray-50 overflow-auto">
				{activeTab === 'hero' && <HomePage />}
                {activeTab === 'about' && <AboutPage />}
			</main>
		</div>
	);
};

export default AdminDashboard;
