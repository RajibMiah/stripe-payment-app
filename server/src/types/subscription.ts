export interface AddPlanRequestBody {
    name: string;
    stripe_price_id: string;
    trail_days: number;
    have_trial: boolean;
    amount: number;
    type: string;
}

interface GetPlanRequestBody {
    name: string;
    stripe_price_id: string;
    trail_days: number;
    have_trial: boolean;
    amount: number;
    type: string;
}

export interface CardDetails {
    id: string;
    brand: string;
    country: string;
    exp_month: string;
    exp_year: string;
    last4: string;
}

export interface CreateSubscriptionRequestBody {
    id: string;
    card: CardDetails;
}
