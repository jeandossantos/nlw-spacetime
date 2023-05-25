import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

type IPayload = {
  sub: string;
  name: string;
  avatarUrl: string;
};

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) return res.status(401).end();

    const [, token] = authToken.split(' ');

    const payload = verify(token, process.env.APP_SECRET!) as IPayload;

    req.userId = payload.sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
