import { Category } from './category';

export interface OnePoiResponse {
    id: string;
    name: string;
    categories: Category[];
    coordinates: { lat: number, lng: number };
    comments: string[]; // CommentResponse[];
    stars: number;
    qrCode: string;
    audioguides: {
        originalFile: string;
        translations:[
            {
                id:string,
                translatedFile:string
            }
        ]
    };
    
    description: {
        originalDescription: string;
        translations:[
            {
                idLanguage:string,
                translatedDescription:string
            }
        ]
    };
    coverImage: string;
    images: string[];
    year: number;
    creator?: string;
    status: string;
    schedule: string;
    price?: number;
}
