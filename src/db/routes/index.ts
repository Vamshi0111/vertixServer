import express from 'express';
import customer_router from './customer_router';
import { protect } from '../../middleware/authMiddleware';
import userRouter from './userRouter';

const routes = express.Router();

routes.use('/vertix/customer', customer_router);
routes.use('/vertix/users', userRouter);

routes.get('/profile', protect, (req: any, res) => {
  res.json({ user: req.user });
});

export default routes;