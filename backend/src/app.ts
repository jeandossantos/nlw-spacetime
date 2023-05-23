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
import { uploadRoutes } from './routes/upload';
import path from 'path';

const app = express();
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(authRoutes);
app.use(uploadRoutes);
app.use(ensureAuthenticated, memoryRoutes);
app.use(ensureAuthenticated, userRoutes);

app.use(
  (
    error: CustomException | ZodError | Error,
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

    console.error(error);

    return res.status(500).json({
      code: 500,
      message: 'Unexpected error',
    });
  }
);

export { app };
