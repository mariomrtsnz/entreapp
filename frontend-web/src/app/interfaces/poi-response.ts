import { Category } from './category';

export interface PoiResponse {
    id: string;
    name: string;
    categories: Category;
    coordinates: {long: string, lat: string};
    comments: string[]; // CommentResponse[];
    // badges: BadgeResponse[];
    qrCode: string;
    audioguides: string[];
    description: string;
    images: string[];
    year: number;
    creator?: string;
    likes: string[]; // LikesResponse[];
    status: string;
    // Schedule
    price?: number;
}
