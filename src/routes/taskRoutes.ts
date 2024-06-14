import { Router } from 'express';
import * as taskController from '../controllers/taskController';

const router = Router();

router.post('/:userId/tasks', taskController.createTask);
router.get('/:userId/tasks', taskController.getTasks);
router.get('/:userId/tasks/:taskId', taskController.getTask);
router.put('/:userId/tasks/:taskId', taskController.updateTask);
router.delete('/:userId/tasks/:taskId', taskController.deleteTask);

export default router;
