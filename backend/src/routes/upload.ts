import { Router } from 'express';
import multer from 'multer';
import storage from '../middleware/multer';

const upload = multer(storage);
const routes = Router();

routes.post('/upload', upload.single('upload'), async (req, res) => {
  return res.json({
    ok: true,
  });
});

export { routes as uploadRoutes };
