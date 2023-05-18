import { Router } from 'express';
import MemoryFactory from '../memory/memoryFactory';

const memoryFactory = MemoryFactory.getInstance();
const routes = Router();

routes.post('/memories', async (req, res) => {
  return memoryFactory.create(req, res);
});

routes.get('/memories', async (req, res) => {
  return memoryFactory.getAll(req, res);
});

routes.get('/memories/:id', async (req, res) => {
  return memoryFactory.getById(req, res);
});

routes.delete('/memories/:id', async (req, res) => {
  return memoryFactory.delete(req, res);
});

routes.put('/memories/:id', async (req, res) => {
  return memoryFactory.update(req, res);
});

export { routes as memoryRoutes };
