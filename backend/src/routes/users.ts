import { Router } from 'express';

const routes = Router();

routes.post('/users', async (req, res) => {});
routes.get('/users', async (req, res) => {});
routes.get('/users/:id', async (req, res) => {});
routes.delete('/users/:id', async (req, res) => {});
routes.put('/users/:id', async (req, res) => {});

export { routes as userRoutes };
