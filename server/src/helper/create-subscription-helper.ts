import { validationResult } from 'express-validator';
import { Request } from 'express';
import Stripe from 'stripe';
import { convertFullName } from '../utilites/user';
import { UserJwtToken } from '../types/user';
import SubscriptionPlan from '../models/subscriptionPlan';
import {
    CardDetails,
    CreateSubscriptionRequestBody,
} from '../types/subscription';
import { createCustomer, saveCardDetails } from './subscriptionHelper';

export const validateRequest = (req: Request) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return {
            success: false,
            message: 'Validation failed',
            errors: errors.array(),
        };
    }
    return null;
};

export const findSubscriptionPlan = async (plan_id: string) => {
    const subscriptionPlan = await SubscriptionPlan.findOne({ _id: plan_id });
    if (!subscriptionPlan) {
        return {
            success: false,
            message: 'No subscription found',
        };
    }
    return subscriptionPlan;
};

export const createStripeCustomer = async (
    firstName: string,
    lastName: string,
    email: string,
    cardId: string
) => {
    const customer = await createCustomer(
        convertFullName(firstName, lastName),
        email,
        cardId
    );

    if (!customer.success) {
        return {
            success: false,
            message: 'Customer creation failed',
        };
    }
    return customer.data;
};

export const saveCardDetailsHelper = async (
    card: CardDetails['card'],
    userId: string,
    customerId: string
) => {
    const cardDetails = await saveCardDetails(card, userId, customerId);
    if (!cardDetails.success) {
        return {
            success: false,
            message: 'Card details is not saved',
        };
    }
    return cardDetails;
};
