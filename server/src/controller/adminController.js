import Hero from '../models/home/heroModel.js';
import Affiliation from '../models/home/affiliation&accreditationModel.js';
import Maestros from '../models/home/maestroModel.js'; 
import Expert from '../models/home/expertModel.js';
import Celebrate from '../models/home/celebrateModel.js';
import Advertising from '../models/home/advertisingModels.js';
import FeaturedInMedia from '../models/home/featuredInMediaModels.js'

import cloudinary from '../../config/cloudinary.js';
import { Readable } from 'stream';


export const uploadBackgroundVideo = async (req, res) => {
	try {
		const files = Array.isArray(req.files) ? req.files : (req.file ? [req.file] : []);
    if (!files.length) return res.status(400).json({ message: 'No media file provided' });

    // Enforce Cloudinary per-file size limit (default 10MB) and return a clear 4xx error
    const CLOUDINARY_MAX_FILE_SIZE = parseInt(process.env.CLOUDINARY_MAX_FILE_SIZE, 10) || 10 * 1024 * 1024; // bytes
    for (const f of files) {
      const isImage = (f.mimetype || '').startsWith('image/');
      if (isImage && typeof f.size === 'number' && f.size > CLOUDINARY_MAX_FILE_SIZE) {
        const maxMB = (CLOUDINARY_MAX_FILE_SIZE / (1024 * 1024)).toFixed(2);
        const gotMB = (f.size / (1024 * 1024)).toFixed(2);
        return res.status(400).json({ message: `File too large: ${f.originalname || f.name || 'file'} is ${gotMB} MB — max per-file is ${maxMB} MB` });
      }
    }

    // --- Upload Function for Cloudinary ---
    // Use upload_stream and stream.end(buffer) pattern to avoid pipe/readable edge-cases
    const uploadFile = (file) => {
      return new Promise((resolve, reject) => {
        try {
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

          // Use stream.end(buffer) which is the recommended approach in other handlers
          // This avoids subtle backpressure/pipe issues with Readable().pipe()
          if (uploadStream && typeof uploadStream.end === 'function') {
            uploadStream.end(file.buffer);
          } else {
            // fallback to piping if end is not available
            const readable = new Readable();
            readable.push(file.buffer);
            readable.push(null);
            readable.pipe(uploadStream);
          }
        } catch (e) {
          reject(e);
        }
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





// create expert with image upload cloudinary
export const createExpert = async (req, res) => {
    try {
        const { name, role, company, linkedIn } = req.body;
        // Support either an uploaded file (req.file or req.files[0]) or an image URL in req.body.img
        let img = '';
        const file = req.file || (Array.isArray(req.files) && req.files[0]);

        // If multer memory buffer present, stream to Cloudinary
        if (file && file.buffer) {
            // upload buffer to Cloudinary
            const uploadBufferToCloudinary = (file, options = { folder: 'experts' }) => {
                return new Promise((resolve, reject) => {
                    if (!file || !file.buffer) return reject(new Error('No file buffer provided'));
                    const mime = file.mimetype || '';
                    if (!mime.startsWith('image/')) return reject(new Error('Only image files are allowed'));

                    const uploadStream = cloudinary.uploader.upload_stream({ folder: options.folder, resource_type: 'image' }, (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                    });

                    const readable = new Readable();
                    readable.push(file.buffer);
                    readable.push(null);
                    readable.pipe(uploadStream);
                });
            };

            const result = await uploadBufferToCloudinary(file, { folder: 'experts' });
            img = result.secure_url;
        } else if (req.file && req.file.path) {
            img = req.file.path;
        } else if (req.files && req.files.length > 0 && req.files[0].path) {
            img = req.files[0].path;
        } else if (req.body && req.body.img) {
            img = req.body.img;
        }

        // If no image provided, return a 400
        if (!img) {
            return res.status(400).json({ message: 'Image is required (upload a file or provide an image URL in `img`)' });
        }

        const newExpert = new Expert({
            img,
            name,
            role,   
            company,
            linkedIn,
            status: 'active'
        });
        await newExpert.save();
        res.status(201).json({ message: 'Expert created successfully', expert: newExpert });
    } catch (error) {
        console.error('Error creating expert:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// get all experts
export const getExperts = async (req, res) => {
    try {
        // Return all experts (both active and inactive). Client can filter as needed.
        const experts = await Expert.find().sort({ createdAt: -1 });
        res.status(200).json(experts);
    }                                                                                                           
    catch (error) {
        console.error('Error fetching experts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// update expert by id
export const updateExpert = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, company, linkedIn, status } = req.body;
        const updateData = { name, role, company, linkedIn, status };
        const file = req.file || (Array.isArray(req.files) && req.files[0]);
        if (file) {
            if (file.buffer) {
                // upload buffer to cloudinary
                const uploadBufferToCloudinary = (file, options = { folder: 'experts' }) => {
                    return new Promise((resolve, reject) => {
                        if (!file || !file.buffer) return reject(new Error('No file buffer provided'));
                        const mime = file.mimetype || '';
                        if (!mime.startsWith('image/')) return reject(new Error('Only image files are allowed'));

                        const uploadStream = cloudinary.uploader.upload_stream({ folder: options.folder, resource_type: 'image' }, (err, result) => {
                            if (err) return reject(err);
                            resolve(result);
                        });

                        const readable = new Readable();
                        readable.push(file.buffer);
                        readable.push(null);
                        readable.pipe(uploadStream);
                    });
                };

                const result = await uploadBufferToCloudinary(file, { folder: 'experts' });
                updateData.img = result.secure_url;
            } else if (file.path) {
                updateData.img = file.path;
            }
        }

        const updatedExpert = await Expert.findByIdAndUpdate
            (id, updateData, { new: true });
        if (!updatedExpert) {
            return res.status(404).json({ message: 'Expert not found' });
        }
        res.status(200).json({ message: 'Expert updated successfully', expert: updatedExpert });
    } catch (error) {
        console.error('Error updating expert:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// delete expert by id (soft delete by setting status to inactive)
export const deleteExpert = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpert = await Expert.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
        if (!deletedExpert) {
            return res.status(404).json({ message: 'Expert not found' });
        }
        res.status(200).json({ message: 'Expert deleted successfully', expert: deletedExpert });
    }
    catch (error) {
        console.error('Error deleting expert:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



// Get all celebrate entries
export const getAllCelebrates = async (req, res) => {
    try {
        const celebrates = await Celebrate.find().sort({ createdAt: -1 });
        res.status(200).json(celebrates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Create a new celebrate entry
export const createCelebrate = async (req, res) => {
  try {
    let imageUrl = '';
    let companyLogoUrl = '';
    // Robustly extract files from req.files (array or object)
    let imageFile = null, companyLogoFile = null;
    if (Array.isArray(req.files)) {
      imageFile = req.files.find(f => f.fieldname === 'image');
      companyLogoFile = req.files.find(f => f.fieldname === 'companyLogo');
    } else if (req.files) {
      imageFile = req.files.image && req.files.image[0];
      companyLogoFile = req.files.companyLogo && req.files.companyLogo[0];
    }
    // Helper to upload a file buffer to Cloudinary
    const uploadToCloudinary = (file, folder) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
          folder,
          resource_type: 'image',
        }, (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        });
        stream.end(file.buffer);
      });
    };

    if (imageFile) {
      imageUrl = await uploadToCloudinary(imageFile, 'celebrate');
    } else if (req.body.image) {
      imageUrl = req.body.image;
    }
    if (companyLogoFile) {
      companyLogoUrl = await uploadToCloudinary(companyLogoFile, 'celebrate');
    } else if (req.body.companyLogo) {
      companyLogoUrl = req.body.companyLogo;
    }

    // Save celebrate with Cloudinary image URLs
    const celebrate = new Celebrate({
      ...req.body,
      image: imageUrl,
      companyLogo: companyLogoUrl,
    });
    await celebrate.save();
    res.status(201).json(celebrate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a celebrate entry
export const updateCelebrate = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['active', 'inactive'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }
        const celebrate = await Celebrate.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!celebrate) return res.status(404).json({ error: 'Not found' });
        res.status(200).json(celebrate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a celebrate entry
export const deleteCelebrate = async (req, res) => {
    try {
        const celebrate = await Celebrate.findByIdAndDelete(req.params.id);
        if (!celebrate) return res.status(404).json({ error: 'Not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



export const CreateAdvertising = async (req, res) => {
  try {
    // Extract file from multer
    const file = req.file || (Array.isArray(req.files) && req.files[0]);
    const medial = req.body.medial;
    const status = req.body.status || 'active';
    if (!file || !medial) {
      return res.status(400).json({ error: 'Media file and medial type are required' });
    }

    // Upload to Cloudinary
    const resource_type = medial === 'video' ? 'video' : 'image';
    const folder = 'advertising';
    const uploadStream = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type, folder }, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
        stream.end(file.buffer);
      });
    };
    const result = await uploadStream();

    // Create a new advertising entry
    const advertising = new Advertising({
      medial,
      url: result.secure_url,
      publicId: result.public_id,
      status
    });

    await advertising.save();
    res.status(201).json(advertising);
  } catch (error) {
    console.error('Error creating advertising:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const GetAllAdvertising = async (req, res) => {
    try {
        const advertisings = await Advertising.find().sort({ createdAt: -1 });
        res.status(200).json(advertisings);
    } catch (error) {
        console.error('Error fetching advertising:', error);
        res.status(500).json({ message: 'Server error' });
    }
};  


export const UpdateAdvertisingStatus = async (req, res) => {
    try {
        const advertising = await Advertising.findById(req.params.id);
        if (!advertising) return res.status(404).json({ message: 'Advertising not found' });
        const newStatus = req.body.status && ['active', 'inactive'].includes(req.body.status)
            ? req.body.status
            : (advertising.status === 'active' ? 'inactive' : 'active');  
        advertising.status = newStatus;
        await advertising.save();
        return res.json({ message: 'Status updated', advertising });
    } catch (err) {
        console.error('UpdateAdvertisingStatus error:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};


export const DeleteAdvertising = async (req, res) => {
    try {
        const advertising = await Advertising.findByIdAndDelete(req.params.id);
        if (!advertising) return res.status(404).json({ message: 'Advertising not found' });
        return res.json({ message: 'Advertising deleted' });
    } catch (err) {
        console.error('DeleteAdvertising error:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
};


export const CreateFeaturedInMedia =async (req, res)=>{
  try {
    // Accept both MediaUrl and mediaUrl for compatibility
    const mediaUrl = req.body.MediaUrl || req.body.mediaUrl || '';
    const status = req.body.status || 'active';
    let imageUrl = req.body.image || '';

    // If file is present, upload to Cloudinary
    const file = req.file || (Array.isArray(req.files) && req.files[0]);
    if (file && file.buffer) {
      const uploadStream = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'featuredInMedia' }, (err, result) => {
            if (err) return reject(err);
            resolve(result);
          });
          stream.end(file.buffer);
        });
      };
      const result = await uploadStream();
      imageUrl = result.secure_url;
    }

    // At least one of imageUrl or mediaUrl must be present
    if (!imageUrl && !mediaUrl) {
      return res.status(400).json({ error: 'At least one of image or mediaUrl is required' });
    }

    const featuredInMedia = new FeaturedInMedia({
      MediaUrl: mediaUrl,
      image: imageUrl,
      status
    });

    await featuredInMedia.save();
    res.status(201).json(featuredInMedia);
  } catch (error) {
    console.error('Error creating FeaturedInMedia:', error);
    res.status(500).json({ message: 'Server error' });
  }
}



export const GetAllFeaturedInMedia = async (req, res) => {
  try {
    const featuredInMedia = await FeaturedInMedia.find().sort({ createdAt: -1 });
    res.status(200).json(featuredInMedia);
  } catch (error) {
    console.error('Error fetching FeaturedInMedia:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


export const UpdateFeaturedInMediaStatus =async (req,res)=>{
  try {
    const featuredInMedia = await FeaturedInMedia.findById(req.params.id);
    if (!featuredInMedia) return res.status(404).json({ message: 'FeaturedInMedia not found' });

    const newStatus = req.body.status && ['active', 'inactive'].includes(req.body.status)
      ? req.body.status
      : (featuredInMedia.status === 'active' ? 'inactive' : 'active');

    featuredInMedia.status = newStatus;
    await featuredInMedia.save();
    return res.json({ message: 'Status updated', featuredInMedia });
  } catch (err) {
    console.error('UpdateFeaturedInMediaStatus error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}



export const DeleteFeaturedInMedia = async (req, res) => {
  try {
    const featuredInMedia = await FeaturedInMedia.findByIdAndDelete(req.params.id);
    if (!featuredInMedia) return res.status(404).json({ message: 'FeaturedInMedia not found' });
    return res.json({ message: 'FeaturedInMedia deleted' });
  } catch (err) {
    console.error('DeleteFeaturedInMedia error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}