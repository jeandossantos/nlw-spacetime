import AuthFactory from '../auth/authFactory';

import { Router } from 'express';

const factory = AuthFactory.getInstance();
const routes = Router();

routes.post('/register', async (req, res) => {
  return factory.authenticate(req, res);
});

export { routes as authRoutes };
