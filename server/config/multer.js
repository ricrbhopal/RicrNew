import multer from 'multer';

// Use memory storage so files are available as Buffer on req.file.buffer
const storage = multer.memoryStorage();

const fileFilter = (allowedTypes) => (req, file, cb) => {
  const mime = file.mimetype;
  const isAllowed = allowedTypes.some(type => mime.startsWith(type));
  if (isAllowed) cb(null, true);
  else cb(new Error('Invalid file type'), false);
};

export const uploadVideo = (options = {}) => {
  const limits = { fileSize: options.maxSize || 200 * 1024 * 1024 }; // default 200MB
  return multer({ storage, fileFilter: fileFilter(['video']), limits });
};

export const uploadImage = (options = {}) => {
  const limits = { fileSize: options.maxSize || 200 * 1024 * 1024 }; // default 200MB
  return multer({ storage, fileFilter: fileFilter(['image']), limits });
};

// Accept both images and videos (useful for combined media upload endpoints)
export const uploadMedia = (options = {}) => {
  const limits = { fileSize: options.maxSize || 200 * 1024 * 1024 }; // default 200MB
  return multer({ storage, fileFilter: fileFilter(['image', 'video']), limits });
};

export default multer({ storage });
