import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../config/api';
import { MdFavoriteBorder, MdChatBubbleOutline, MdPlayCircleFilled } from 'react-icons/md';

const MilneStoneRecoginzation = () => {
	const [stories, setStories] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let mounted = true;
		const fetch = async () => {
			setLoading(true);
			try {
				const res = await adminAPI.getAllStories();
				if (!mounted) return;
				const items = res.data || [];
				// show only active stories
				setStories(items.filter(s => s.status === 'active'));
			} catch (err) {
				console.warn('Failed to fetch stories', err);
				if (!mounted) return;
				setStories([]);
			} finally {
				if (mounted) setLoading(false);
			}
		};
		fetch();
		return () => { mounted = false; };
	}, []);

	if (!stories.length) return null;

	return (
		<section className="py-8">
			<div className="bg-[#125785] w-full py-12 mb-8">
				<div className="max-w-6xl mx-auto px-4">
					<h2 className="text-5xl font-bold text-white text-center mt-5">Student Success Stories</h2>
					<p className="font-semibold text-2xl text-white text-center mt-5">Discover how our learners turned RICR training into real-world achievements.</p>

					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10">
						{stories.map((s) => {
							const likes = s.likes || s.heartCount || s.heart || 0;
							const comments = s.comments || s.messageCount || s.messages || 0;
							const username = s.username || s.handle || 'ricredu';
							const avatar = s.avatar || s.profileImage || '';
							const isVideo = s.mediaType === 'video' || (s.Url && s.Url.includes('instagram'));

							return (
								<div key={s._id} className="overflow-hidden rounded-lg bg-white shadow-sm relative">
									{/* header overlay (avatar + username) */}
									<div className="absolute top-2 left-2 z-20 flex items-center gap-2">
										{avatar ? (
											<img src={avatar} alt={username} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
										) : (
											<div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-sm font-medium text-gray-700">R</div>
										)}
										<span className="text-sm font-medium text-white drop-shadow">{username}</span>
									</div>

									<a href={s.Url || s.url} target="_blank" rel="noopener noreferrer">
										<div className="w-full h-28 sm:h-32 md:h-36 lg:h-40 overflow-hidden">
											<img src={s.image} alt={s.caption || 'story image'} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
										</div>
									</a>

									{isVideo && (
										<MdPlayCircleFilled className="absolute top-3 right-3 text-white text-3xl z-20 drop-shadow" />
									)}

									{/* footer overlay with counts */}
									<div className="absolute bottom-3 left-3 z-20">
										<div className="flex items-center gap-3 bg-white/80 backdrop-blur rounded-full px-3 py-1">
											<div className="flex items-center gap-1 text-sm text-gray-800">
												<MdFavoriteBorder className="text-red-500" />
												<span>{likes}</span>
											</div>
											<div className="flex items-center gap-1 text-sm text-gray-800">
												<MdChatBubbleOutline />
												<span>{comments}</span>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default MilneStoneRecoginzation;
