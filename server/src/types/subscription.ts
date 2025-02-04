export interface AddPlanRequestBody {
    name: string;
    stripe_price_id: string;
    trial_days: number;
    have_trial: boolean;
    amount: number;
    type: string;
}

interface GetPlanRequestBody {
    name: string;
    stripe_price_id: string;
    trial_days: number;
    have_trial: boolean;
    amount: number;
    type: string;
}

export interface CardDetails {
    id: string;
    object: string;
    card: {
        id: string;
        brand: string;
        country: string;
        exp_month: string;
        exp_year: string;
        last4: string;
    };
}

export interface CreateSubscriptionRequestBody {
    plan_id: string;
    card_data: CardDetails;
}

export interface CardData {
    id: string;
    name: string;
    brand: string;
    month: number;
    exp_year: number;
}
