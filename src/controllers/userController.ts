import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const createUser = (req: Request, res: Response): void => {
  const { name } = req.body;
  const user = userService.createUser(name);
  res.status(201).json(user);
};
