import { Task } from '../models/task';
import { v4 as uuidv4 } from 'uuid';

const tasks: Map<string, Task[]> = new Map();

export const createTask = (userId: string, task: Omit<Task, 'id'>): Task => {
  const newTask: Task = { ...task, id: uuidv4() };
  const userTasks = tasks.get(userId) || [];
  tasks.set(userId, [...userTasks, newTask]);
  return newTask;
};

export const getTasks = (userId: string): Task[] => {
  return tasks.get(userId) || [];
};

export const getTask = (userId: string, taskId: string): Task | undefined => {
  return tasks.get(userId)?.find(task => task.id === taskId);
};

export const updateTask = (userId: string, taskId: string, task: Partial<Task>): Task | undefined => {
  const userTasks = tasks.get(userId) || [];
  const taskIndex = userTasks.findIndex(t => t.id === taskId);
  if (taskIndex !== -1) {
    const updatedTask = { ...userTasks[taskIndex], ...task };
    userTasks[taskIndex] = updatedTask;
    tasks.set(userId, userTasks);
    return updatedTask;
  }
  return undefined;
};

export const deleteTask = (userId: string, taskId: string): boolean => {
  const userTasks = tasks.get(userId) || [];
  const taskIndex = userTasks.findIndex(t => t.id === taskId);
  if (taskIndex !== -1) {
    userTasks.splice(taskIndex, 1);
    tasks.set(userId, userTasks);
    return true;
  }
  return false;
};
