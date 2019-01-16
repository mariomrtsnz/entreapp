import { OnePoiResponse } from './one-poi-response';

export interface OneRouteResponse {
    id: string;
    name: string;
    pois: OnePoiResponse[];
}
