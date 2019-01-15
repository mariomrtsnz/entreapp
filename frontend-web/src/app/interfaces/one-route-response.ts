import { OnePoiResponse } from './one-poi-response';

export interface OneRouteResponse {
    id: string;
    pois: OnePoiResponse[];
    name: string;
}
