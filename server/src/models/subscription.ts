import mongoose from 'mongoose';

const subscriptionsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        stripe_price_id: {
            type: String,
            require: true,
        },
        plan: {
            type: String,
            enum: ['one-time', 'weekly', 'free-trial', 'subscription'],
            required: true,
        },
        have_trial: {
            type: Boolean,
            default: true,
        },
        amount: {
            type: Boolean,
            default: false,
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date,
        },
        isCancelled: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Subscription', subscriptionsSchema);
