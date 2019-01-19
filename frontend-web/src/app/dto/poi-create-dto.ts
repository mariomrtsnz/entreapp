export class PoiCreateDto {
    audioguides: {
        originalFile: string;
    };
    categories?: string[];
    coordinates: {
        lat: string,
        lon: string
    };
    creator?: string;
    description: {
        originalDescription: string;
    };
    name: string;
    coverImage: string;
    images: string[];
    price: number;
    schedule: string;
    status: string;
    year: Date;
}
