import { Category } from './category';

export interface OnePoiResponse {
    id: string;
    name: string;
    categories: Category[];
    coordinates: { lat: number, lng: number };
    comments: string[]; // CommentResponse[];
    stars: number;
    // badges: BadgeResponse[];
    qrCode: string;
    audioguides: string[];
    description: string;
    coverImage: string;
    images: string[];
    year: number;
    creator?: string;
    status: string;
    schedule: string;
    price?: number;
}
