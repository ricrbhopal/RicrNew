import React, { useState } from 'react';
import SideBar from './sideBar';
import HomePage from './homeTab/homePage.jsx';
import AboutPage from './SilderTab/aboutTab.jsx';
import CoursesTab from './SilderTab/coursesTab.jsx';


const AdminDashboard = () => {
	const [activeTab, setActiveTab] = useState('hero');
	// const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

	// if (!token) {
	// 	return (
	// 		<div className="flex items-center justify-center min-h-screen bg-gray-100">
	// 			<div className="bg-white p-8 rounded-xl shadow text-center">
	// 				<h2 className="text-xl font-bold mb-2 text-[#125785]">Please login</h2>
	// 				<p className="text-gray-600">You must be logged in to view the admin dashboard.</p>
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<div className="flex h-screen mt-20">
			<SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
			<main className="flex-1 bg-gray-50 overflow-auto">
				{activeTab === 'hero' && <HomePage />}
				{activeTab === 'about' && <AboutPage />}
				{activeTab === 'courses' && <CoursesTab />}
			</main>
		</div>
	);
};

export default AdminDashboard;
