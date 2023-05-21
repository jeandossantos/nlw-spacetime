import 'express-async-errors';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { memoryRoutes } from './routes/memories';
import { userRoutes } from './routes/users';
import { ZodError } from 'zod';
import { authRoutes } from './routes/auth';
import { ensureAuthenticated } from './middleware/isAuthenticated';
import { CustomException } from './exceptions/CustomException';

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(authRoutes);
app.use(ensureAuthenticated, memoryRoutes);
app.use(ensureAuthenticated, userRoutes);

app.use(
  (
    error: ZodError | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof CustomException) {
      return res.status(error.code).json({
        message: error.message,
        code: error.code,
      });
    }

    if (error instanceof ZodError) {
      return res.status(400).json(error);
    }

    console.error(error.message || error);

    return res.status(500).json({
      code: 500,
      message: 'Unexpected error',
    });
  }
);

export { app };
