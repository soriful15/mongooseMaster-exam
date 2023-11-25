import express from 'express';
import { UserControllers } from './users.controller';
const router = express.Router();

router.post('/users', UserControllers.createUser);
router.post('/users', UserControllers.getAllUser);
export const usersRoutes = router;
