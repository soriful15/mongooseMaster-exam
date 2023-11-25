import express from 'express';
import { UserControllers } from './users.controller';
const router = express.Router();

router.post('/users', UserControllers.createUser);
router.post('/users', UserControllers.getAllUser);
router.get('/users/:userId', UserControllers.getSingleUser);
export const usersRoutes = router;
