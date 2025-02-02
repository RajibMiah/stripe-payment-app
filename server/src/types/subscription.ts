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
