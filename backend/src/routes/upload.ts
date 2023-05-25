import { Router } from 'express';
import multer from 'multer';
import storage from '../middleware/multer';

const upload = multer(storage);
const routes = Router();

routes.post('/upload', upload.single('upload'), async (req, res) => {
  const baseUrl = `${req.protocol}://${req.hostname}`;

  return res.json({
    fileUrl: `${baseUrl}/uploads/${req.file?.filename}`,
  });
});

export { routes as uploadRoutes };
