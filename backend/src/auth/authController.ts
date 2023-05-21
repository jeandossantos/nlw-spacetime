import { Request, Response } from 'express';
import { AuthService } from './authService';

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async authenticate(req: Request, res: Response) {
    const { code } = req.body;
    const user = await this.authService.authenticate(code);

    return res.json(user);
  }
}
