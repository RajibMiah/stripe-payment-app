import { check } from 'express-validator';

export const addPlanValidator = [
    check('name', 'name is required').not().isEmpty(),
    check('stripe_price_id', 'stripe price id is required').not().isEmpty(),
    check('trail_days', 'trial_days is required').not().isEmpty(),
    check('have_trial', 'have_trial is required').not().isEmpty(),
    check('amount', 'amount is required').not().isEmpty(),
    check('type', 'type is required').not().isEmpty(),
];

export const planDetailsValidator = [
    check('plan_id', 'plan_id is required').not().isEmpty(),
];

export const createSubscriptionValidator = [
    check('id', 'id is required').not().isEmpty(),
    check('card.id', 'card.id is required').not().isEmpty(),
    check('card.brand', 'card.brand is requred').not().isEmpty(),
    check('chard.country', 'card.country is required').not().isEmpty(),
    check('card.exp_month', 'card.exp_month is required').not().isEmpty(),
    check('card.exp_year', 'card.exp_year is required').not().isEmpty(),
    check('card.exp_last4', 'card.last4 is required').not().isEmpty(),
];
