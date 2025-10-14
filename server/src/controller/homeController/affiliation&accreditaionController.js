import Affiliation from '../../models/home/affiliation&accreditationModel.js';
import cloudinary from '../../../config/cloudinary.js';
import { Readable } from 'stream';


export const uploadAffiliation = async (req, res) => {
  try {
    const files = Array.isArray(req.files) ? req.files : (req.file ? [req.file] : []);
    if (!files.length) return res.status(400).json({ message: 'No image file provided' });

    const uploadOne = (file) => new Promise((resolve, reject) => {
      const isImage = (file.mimetype || '').startsWith('image/');
      const resource_type = isImage ? 'image' : 'auto';
      const folder = 'affiliations';

      const uploadStream = cloudinary.uploader.upload_stream({ resource_type, folder }, (err, result) => {
        if (err) return reject(err);
        resolve({ result, resource_type });
      });

      const readable = new Readable();
      readable.push(file.buffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });

    const results = await Promise.all(files.map(uploadOne));

    const created = [];
    for (const { result, resource_type } of results) {
      const doc = new Affiliation({ image: result.secure_url, status: req.body.status || 'active' });
      // store public_id and resource_type if model extended later
      // optionally add doc.public_id = result.public_id; doc.resource_type = resource_type;
      await doc.save();
      created.push(doc);
    }

    res.status(201).json({ created });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getAffiliations = async (req, res) => {
  try {
    const items = await Affiliation.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const updateAffiliationStatus = async (req, res) => {
  try {
    const item = await Affiliation.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Affiliation not found' });
    const newStatus = req.body.status && ['active', 'inactive'].includes(req.body.status) ? req.body.status : (item.status === 'active' ? 'inactive' : 'inactive');
    item.status = newStatus;
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const deleteAffiliation = async (req, res) => {
  try {
    const item = await Affiliation.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Affiliation not found' });

    // If public_id was stored, attempt to remove from Cloudinary (best-effort)
    // if (item.public_id) {
    //   try { await cloudinary.uploader.destroy(item.public_id, { resource_type: item.resource_type || 'image' }); } catch (e) { console.warn('Cloudinary delete failed', e); }
    // }

    res.json({ message: 'Affiliation deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const getAllAffilications = async (req, res) => {
    try {   
    const items = await Affiliation.find().sort({ createdAt: -1 });
    res.json(items);
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
    }
};




