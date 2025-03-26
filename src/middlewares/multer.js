import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { env } from '../utils/env.js';
import { ENV_VARS } from '../constants/index.js';

cloudinary.config({
  cloud_name: env(ENV_VARS.CLOUDINARY.CLOUD_NAME),
  api_key: env(ENV_VARS.CLOUDINARY.API_KEY),
  api_secret: env(ENV_VARS.CLOUDINARY.API_SECRET),
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'contacts_photos', 
    allowedFormats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

export const upload = multer({ storage });
