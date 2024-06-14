import { User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';

const users: Map<string, User> = new Map();

export const createUser = (name: string): User => {
  const newUser: User = { id: uuidv4(), name, tasks: [] };
  users.set(newUser.id, newUser);
  return newUser;
};

export const getUser = (userId: string): User | undefined => {
  return users.get(userId);
};
