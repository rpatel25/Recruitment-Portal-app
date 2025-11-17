export type StaticsMetric = {
    status_code : number;
    response_type: string;
    description: string;
    data: {
        time: string;
        cost: string;
        credits: string;
        total_candidates: string|null;
    }
}