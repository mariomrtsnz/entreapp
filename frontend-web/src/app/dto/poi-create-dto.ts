export class PoiCreateDto {
    audioguides: string[];
    categories: string[];
    coordinates: {
        lat: string,
        lon: string
    };
    creator?: string;
    description: string;
    name: string;
    images: string[];
    likes: string[];
    price: number;
    schedule: string;
    status: string;
    year: Date;
}
