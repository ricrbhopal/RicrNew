// controllers/maestroController.js
import Maestros from '../../models/home/maestroModel.js'; // adjust path if needed
import cloudinary from '../../../config/cloudinary.js';
import { Readable } from 'stream';


const uploadBufferToCloudinary = (file, options = { folder: 'maestros' }) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) return reject(new Error('No file buffer provided'));

    // only image expected here, but guard:
    const mime = file.mimetype || '';
    if (!mime.startsWith('image/')) return reject(new Error('Only image files are allowed'));

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: options.folder, resource_type: 'image' },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    const readable = new Readable();
    readable.push(file.buffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });
};


export const createMaestro = async (req, res) => {
  try {
    const { name, role, linkedIn } = req.body;
    if (!name || !role) return res.status(400).json({ message: 'name and role are required' });

    let imgUrl = req.body.img; // optional: frontend can pass image URL directly
    // if multer file present, upload it and override imgUrl
    const file = req.file || (Array.isArray(req.files) && req.files[0]);
    if (file) {
      const result = await uploadBufferToCloudinary(file, { folder: 'maestros' });
      imgUrl = result.secure_url;
    }

    if (!imgUrl) return res.status(400).json({ message: 'Image is required (file upload or img URL)' });

    const maestro = new Maestros({
      name,
      img: imgUrl,
      role,
      linkedIn: linkedIn || '',
      type: 'maestro',
      status: 'active'
    });

    await maestro.save();
    return res.status(201).json({ message: 'Maestro created', maestro });
  } catch (err) {
    console.error('createMaestro error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message || err });
  }
};


export const getAllMaestros = async (req, res) => {
  try {
    const maestros = await Maestros.find().sort({ createdAt: -1 });
    return res.json(maestros);
  } catch (err) {
    console.error('getAllMaestros error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const updateMaestro = async (req, res) => {
  try {
    const id = req.params.id;
    const maestro = await Maestros.findById(id);
    if (!maestro) return res.status(404).json({ message: 'Maestro not found' });

    const { name, role, linkedIn, status } = req.body;

    if (name) maestro.name = name;
    if (role) maestro.role = role;
    if (typeof linkedIn !== 'undefined') maestro.linkedIn = linkedIn;
    if (status && ['active', 'inactive'].includes(status)) maestro.status = status;

    // handle image replacement (file or URL)
    const file = req.file || (Array.isArray(req.files) && req.files[0]);
    if (file) {
      const result = await uploadBufferToCloudinary(file, { folder: 'maestros' });
      maestro.img = result.secure_url;
      // NOTE: if you want to delete the old cloudinary resource you need to store public_id in schema
    } else if (req.body.img) {
      maestro.img = req.body.img;
    }

    await maestro.save();
    return res.json({ message: 'Maestro updated', maestro });
  } catch (err) {
    console.error('updateMaestro error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const updateMaestroStatus = async (req, res) => {
  try {
    const maestro = await Maestros.findById(req.params.id);
    if (!maestro) return res.status(404).json({ message: 'Maestro not found' });

    const newStatus = req.body.status && ['active', 'inactive'].includes(req.body.status)
      ? req.body.status
      : (maestro.status === 'active' ? 'inactive' : 'active');

    maestro.status = newStatus;
    await maestro.save();
    return res.json({ message: 'Status updated', maestro });
  } catch (err) {
    console.error('updateMaestroStatus error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const deleteMaestro = async (req, res) => {
  try {
    const maestro = await Maestros.findByIdAndDelete(req.params.id);
    if (!maestro) return res.status(404).json({ message: 'Maestro not found' });
    return res.json({ message: 'Maestro deleted' });
  } catch (err) {
    console.error('deleteMaestro error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
