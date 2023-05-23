import multer from 'multer';
import path from 'path';
import { CustomException } from '../exceptions/CustomException';

export default {
  dest: path.resolve(__dirname, '..', 'uploads'),
  fileFilter: (req: any, file: any, cb: any) => {
    const allowedMimesRegex = /^(image|video)\/[a-zA-Z]+/;
    const isValidFileFormat = allowedMimesRegex.test(file.mimetype);

    if (isValidFileFormat) {
      cb(null, true);
    } else {
      cb(new CustomException('Invalid type file.'));
    }
  },
  limits: {
    fileSize: 5000000, // 5MB,
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'public'));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '_' + file.originalname);
    },
  }),
};
