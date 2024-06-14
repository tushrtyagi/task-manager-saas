import { Request, Response } from 'express';
import * as taskService from '../services/taskService';

export const createTask = (req: Request, res: Response): void => {
  const { userId } = req.params;
  const task = taskService.createTask(userId, req.body);
  res.status(201).json(task);
};

export const getTasks = (req: Request, res: Response): void => {
  const { userId } = req.params;
  const tasks = taskService.getTasks(userId);
  res.status(200).json(tasks);
};

export const getTask = (req: Request, res: Response): void => {
  const { userId, taskId } = req.params;
  const task = taskService.getTask(userId, taskId);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

export const updateTask = (req: Request, res: Response): void => {
  const { userId, taskId } = req.params;
  const task = taskService.updateTask(userId, taskId, req.body);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

export const deleteTask = (req: Request, res: Response): void => {
  const { userId, taskId } = req.params;
  const success = taskService.deleteTask(userId, taskId);
  if (success) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};
