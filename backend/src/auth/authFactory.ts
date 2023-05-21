import { UserRepository } from '../user/UserRepository';
import { AuthController } from './authController';
import { AuthService } from './authService';

export default class AuthFactory {
  static getInstance() {
    const repository = new UserRepository();
    const service = new AuthService(repository);
    const controller = new AuthController(service);

    return controller;
  }
}
