import { OnePoiResponse } from './one-poi-response';

export interface OneBadgeResponse {
    id: string;
    name: string;
    points: number;
    description: string;
    icon: string;
    pois: OnePoiResponse[];
}
