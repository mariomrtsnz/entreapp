import { Category } from './category';
import { OnePoiResponse } from './one-poi-response';

export interface PoiResponse {
    count: number;
    rows: OnePoiResponse[];
}
