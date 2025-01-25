import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
  subscription,
  oneTimePayment,
  trialSubscription,
} from '../controllers/paymentController';

// Create an instance of the Express router
const router = express.Router();

/**
 * Payment Routes
 *
 * @route POST /api/payments/create-checkout-session - Handles the creation of a subscription checkout session
 * @route POST /api/payments/create-one-time-payment - Processes a one-time payment request
 * @route POST /api/payments/create-trial-subscription - Initiates a trial subscription for the user
 * @access Private (Requires authentication)
 */
router.post('/create-checkout-session', authMiddleware, subscription);
router.post('/create-one-time-payment', authMiddleware, oneTimePayment);
router.post('/create-trial-subscription', authMiddleware, trialSubscription);

// Export the router to be used in the main application
export default router;
