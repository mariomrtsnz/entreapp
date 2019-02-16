import { Category } from './category';

export interface OnePoiResponse {
    id: string;
    name: string;
    categories: Category[];
    loc: {
        coordinates: number[];
    }
    stars: number;
    qrCode: string;
    audioguides: {
        language: {
            language: string;
        }
        originalFile: string;
        translations: [
            {
                id: string,
                translatedFile: string
            }
        ]
    };

    description: {
        language: {
            language: string;
        }
        originalDescription: string;
        translations: [
            {
                id: string,
                translatedDescription: string
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
