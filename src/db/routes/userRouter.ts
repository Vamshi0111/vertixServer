import { Router } from 'express';
import User from '../models/user';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    try {
        const getData = await User.findAll();
        console.log('Error due to :', getData)
        res.status(201).send({ message: 'Fetched all the users', getData });
        return

    } catch (error) {
        res.status(500).send({ message: 'Internal server error at userget', error })
        return
    }
});

export default userRouter;