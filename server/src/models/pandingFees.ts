import mongoose from 'mongoose';

const pandingFeesSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        charge_id: {
            type: String,
            required: true,
        },
        customer_id: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('PendingFees', pandingFeesSchema);
