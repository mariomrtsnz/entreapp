import { OnePoiResponse } from './one-poi-response';

export interface Badge {
    id: string;
    name: string;
    points: number;
    description: string;
    icon: string;
    pois: OnePoiResponse[];
}
