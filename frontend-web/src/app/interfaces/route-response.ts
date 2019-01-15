import { OneRouteResponse } from './one-route-response';

export interface RouteResponse {
    count: number;
    rows: OneRouteResponse[];
}
