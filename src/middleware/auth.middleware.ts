import { HttpStatus, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { env } from 'process';

export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.method === 'OPTIONS') {
        next();
      }

      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        return res.status(HttpStatus.FORBIDDEN).send({
          message: 'Пользователь не авторизован',
        });
      }

      const decodedDate = jwt.verify(token, env.SECRET_KEY);
      req.body.username = decodedDate.username;
      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
  }
}
