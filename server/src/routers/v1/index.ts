import express from 'express';
import authRouter from '../v1/user';
import subscriptionRouter from '../v1/subscription';
const router = express.Router();

router.use('/auth', authRouter);
router.use('/subscription', subscriptionRouter);

export default router;
