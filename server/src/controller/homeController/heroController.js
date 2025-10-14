import Hero from '../../models/home/heroModel.js';
import cloudinary from '../../../config/cloudinary.js';
import { Readable } from 'stream';


export const uploadBackgroundVideo = async (req, res) => {
	try {
		const files = Array.isArray(req.files) ? req.files : (req.file ? [req.file] : []);
		if (!files.length) return res.status(400).json({ message: 'No media file provided' });

		// --- Upload Function for Cloudinary ---
		const uploadFile = (file) => {
			return new Promise((resolve, reject) => {
				const isImage = file.mimetype?.startsWith('image/');
				const resource_type = isImage ? 'image' : 'video';
				const folder = isImage ? 'bg_images' : 'bg_videos';

				const uploadStream = cloudinary.uploader.upload_stream(
					{ resource_type, folder },
					(err, result) => {
						if (err) return reject(err);
						resolve({ result, mediaType: isImage ? 'image' : 'video' });
					}
				);

				const readable = new Readable();
				readable.push(file.buffer);
				readable.push(null);
				readable.pipe(uploadStream);
			});
		};

		// Upload all files (image/video mixed)
		const uploadResults = await Promise.all(files.map(uploadFile));
		const createdHeroes = [];

		for (const { result, mediaType } of uploadResults) {
			const hero = new Hero({
				backgroundVideo: result.secure_url,
				mediaType,
				public_id: result.public_id,
				thumbnail: result.secure_url,
				status: req.body.status === 'inactive' ? 'inactive' : 'active',
			});
			await hero.save();
			createdHeroes.push(hero);
		}

		res.status(201).json({ message: 'Media uploaded successfully', created: createdHeroes });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
};


export const getHero = async (req, res) => {
	try {
		const hero = await Hero.findOne({ status: 'active' });
		if (!hero) return res.status(404).json({ message: 'No active hero found' });
		res.json(hero);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
};


export const updateHero = async (req, res) => {
	try {
		const hero = await Hero.findOne().sort({ createdAt: -1 });
		if (!hero) return res.status(404).json({ message: 'Hero not found' });

		if (req.body.backgroundVideo) hero.backgroundVideo = req.body.backgroundVideo;
		if (req.body.status && ['active', 'inactive'].includes(req.body.status)) hero.status = req.body.status;
		if (req.body.mediaType && ['video', 'image'].includes(req.body.mediaType)) hero.mediaType = req.body.mediaType;

		await hero.save();
		res.json(hero);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
};


export const updateStatus = async (req, res) => {
	try {
		const hero = await Hero.findById(req.params.id);
		if (!hero) return res.status(404).json({ message: 'Hero not found' });

		const newStatus = req.body.status;
		if (newStatus && ['active', 'inactive'].includes(newStatus)) {
			hero.status = newStatus;
		} else {
			hero.status = hero.status === 'active' ? 'inactive' : 'active';
		}

		await hero.save();
		res.json(hero);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
};


export const deleteHero = async (req, res) => {
	try {
		const hero = await Hero.findByIdAndDelete(req.params.id);
		if (!hero) return res.status(404).json({ message: 'Hero not found' });
		res.json({ message: 'Hero deleted successfully' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
};


export const getAllHeroes = async (req, res) => {
	try {
		const heroes = await Hero.find().sort({ createdAt: -1 });
		res.json(heroes);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error', error: err.message });
	}
};


