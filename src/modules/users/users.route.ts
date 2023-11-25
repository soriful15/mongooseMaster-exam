import express from 'express';
import { UserControllers } from './users.controller';
const router = express.Router();

router.post('/users', UserControllers.createUser);
router.get('/users', UserControllers.getAllUser);
router.get('/users/:userId', UserControllers.getSingleUser);
router.put('/users/:userId', UserControllers.updateUser);
router.delete('/users/:userId', UserControllers.deleteUser);
router.put('/users/:userId/orders', UserControllers.insertOrder);
router.get('/users/:userId/orders', UserControllers.getUserOrder);
router.get(
  '/users/:userId/orders/total-price',
  UserControllers.calculateUserOrder,
);

export const usersRoutes = router;
