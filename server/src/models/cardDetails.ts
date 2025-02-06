import mongoose from 'mongoose';

const cardDetailsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    card_name: {
        type: String,
        required: true,
    },
    customer_id: {
        type: String,
        required: true,
    },
    card_id: {
        type: String,
        required: false,
    },
    card_no: {
        type: String,
        required: false,
    },
    brand: {
        type: String,
        required: false,
    },
    month: {
        type: String,
        required: false,
    },
    year: {
        type: String,
        required: false,
    },
});

export default mongoose.model('CardDetail', cardDetailsSchema);
