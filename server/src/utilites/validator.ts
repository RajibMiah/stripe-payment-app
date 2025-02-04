import { check } from 'express-validator';

export const addPlanValidator = [
    check('name', 'name is required').not().isEmpty(),
    check('stripe_price_id', 'stripe price id is required').not().isEmpty(),
    check('trial_days', 'trial_days is required').not().isEmpty(),
    check('have_trial', 'have_trial is required').not().isEmpty(),
    check('amount', 'amount is required').not().isEmpty(),
    check('type', 'type is required').not().isEmpty(),
];

export const planDetailsValidator = [
    check('plan_id', 'plan_id is required').not().isEmpty(),
];

export const createSubscriptionValidator = [
    check('plain_id', 'plan_id is required').not().isEmpty(),
    check('card_data.id', 'card_data.id is required').not().isEmpty(),
    check('card_data.brand', 'card_data.brand is requred').not().isEmpty(),
    check('card_data.country', 'card_data.country is required').not().isEmpty(),
    check('card_data.exp_month', 'card_data.exp_month is required')
        .not()
        .isEmpty(),
    check('card_data.exp_year', 'card_data.exp_year is required')
        .not()
        .isEmpty(),
    check('card_data.exp_last4', 'card_data.last4 is required').not().isEmpty(),
];
