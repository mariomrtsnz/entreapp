import { Category } from "./category";

export interface OnePoiResponse {
    id: string;
    name: string;
    categories: Category[];
    coordinates: { long: string, lat: string };
    comments: string[]; // CommentResponse[];
    stars: number;
    // badges: BadgeResponse[];
    qrCode: string;
    audioguides: string[];
    description: string;
    images: string[];
    year: number;
    creator?: string;
    status: string;
    Schedule: string;
    price?: number;
}
