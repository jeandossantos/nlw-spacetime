import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

type IPayload = {
  id: string;
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

    const sub = verify(token, process.env.APP_SECRET!) as IPayload;

    req.userId = sub.id;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
