/* eslint-disable @typescript-eslint/no-explicit-any */
import { validationResult } from 'express-validator';
import { Request } from 'express';

import { convertFullName } from '../utilites/user';
import SubscriptionPlan from '../models/subscriptionPlan';
import {
    CardDetails,
    SubscriptionPlanType,
    subscriptionTypeFunctions,
} from '../types/subscription';
import { createCustomer, saveCardDetails } from './subscriptionHelper';
import SubscriptionDetails from '../models/subscriptionDetails';

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

export const checkActiveSubscription = async (userId: string) => {
    return await SubscriptionDetails.findOne({
        user_id: userId,
        status: 'active',
        cancel: false,
    });
};

export const countUserSubscriptions = async (userId: string) => {
    return await SubscriptionDetails.countDocuments({
        user_id: userId,
    });
};

interface TransitionCondition {
    plan_interval: string;
    subscription_type: string;
}

const transitionMapping: { [key: string]: TransitionCondition } = {
    monthlyToYearly: { plan_interval: 'Monthly', subscription_type: 'Yearly' },
    monthlyToLifetime: {
        plan_interval: 'Yearly',
        subscription_type: 'LifeTime',
    },
    yearlyToMonthly: { plan_interval: 'Yearly', subscription_type: 'Monthly' },
    yearlyToLifetime: {
        plan_interval: 'Monthly',
        subscription_type: 'Lifetime',
    },
};

export const handleSubscriptionTransition = (
    activeSubscription: any,
    subscriptionPlan: SubscriptionPlanType
) => {
    if (!activeSubscription) {
        return 'newSubscription';
    }

    for (const [transitionType, condition] of Object.entries(
        transitionMapping
    )) {
        if (
            activeSubscription.plan_interval === condition.plan_interval &&
            subscriptionPlan.type === condition.subscription_type
        ) {
            return transitionType;
        }
    }

    return 'newSubscription';
};

const transitionHandlers: {
    [key: string]: (
        customerId: string,
        userId: string,
        subscriptionPlan: SubscriptionPlanType
    ) => Promise<any>;
} = {
    newSubscription: async (
        customerId: string,
        userId: string,
        subscriptionPlan: SubscriptionPlanType
    ) => {
        const userSubscriptionCount = await countUserSubscriptions(userId);
        if (userSubscriptionCount === 0) {
            return await createSubscriptionHelper(
                customerId,
                userId,
                subscriptionPlan
            );
        } else {
            throw new Error('User already has an active subscription');
        }
    },
    monthlyToYearly: async (
        customerId: string,
        userId: string,
        subscriptionPlan: SubscriptionPlanType
    ) => {
        // Handle monthly to yearly transition
        return await createSubscriptionHelper(
            customerId,
            userId,
            subscriptionPlan
        );
    },
    monthlyToLifetime: async (
        customerId: string,
        userId: string,
        subscriptionPlan: SubscriptionPlanType
    ) => {
        // Handle monthly to lifetime transition
        return await createSubscriptionHelper(
            customerId,
            userId,
            subscriptionPlan
        );
    },
    yearlyToMonthly: async (
        customerId: string,
        userId: string,
        subscriptionPlan: SubscriptionPlanType
    ) => {
        // Handle yearly to monthly transition
        return await createSubscriptionHelper(
            customerId,
            userId,
            subscriptionPlan
        );
    },
    yearlyToLifetime: async (
        customerId: string,
        userId: string,
        subscriptionPlan: SubscriptionPlanType
    ) => {
        // Handle yearly to lifetime transition
        return await createSubscriptionHelper(
            customerId,
            userId,
            subscriptionPlan
        );
    },
};

export const createSubscriptionHelper = async (
    customerId: string,
    userId: string,
    subscriptionPlan: any
) => {
    const subscriptionFunction =
        subscriptionTypeFunctions[subscriptionPlan.type];
    if (!subscriptionFunction) {
        throw new Error('Invalid subscription type');
    }
    return await subscriptionFunction(customerId, userId, subscriptionPlan);
};

export const handleTransition = async (
    transitionType: string,
    customerId: string,
    userId: string,
    subscriptionPlan: SubscriptionPlanType
) => {
    const handler = transitionHandlers[transitionType];
    if (!handler) {
        throw new Error('Invalid transition type');
    }
    return await handler(customerId, userId, subscriptionPlan);
};
