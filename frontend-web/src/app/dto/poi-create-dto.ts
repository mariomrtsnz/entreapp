export class PoiCreateDto {
    audioguides: {
        originalFile: string;
        translations: [
            {
                id: string,
                translatedFile: string
            }
        ]
    };
    categories?: string[];
    coordinates: {
        lat: number,
        lng: number
    };
    creator?: string;
    description: {
        originalDescription: string;
        translations: [
            {
                id: string,
                translatedDescription: string
            }
        ]
    };
    name: string;
    coverImage: string;
    images: string[];
    price: number;
    schedule: string;
    status: string;
    year: number;
}
