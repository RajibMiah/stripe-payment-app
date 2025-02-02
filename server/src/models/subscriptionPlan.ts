import mongoose, { mongo } from 'mongoose';

const subscriptionPlanSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        stripe_price_id: {
            type: String,
            required: true,
        },
        trail_days: {
            type: Number,
            required: true,
        },
        have_trial: {
            type: Boolean,
            default: false,
        },
        amount: {
            type: Number,
            required: true,
        },
        type: {
            //0-> monthly , 1-> Tearly , 2-> Lifetime
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('subscriptionPlan', subscriptionPlanSchema);
