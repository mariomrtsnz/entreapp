export class PoiCreateDto {
    audioguides: {
        originalFile: string;
        translations:[
            {
                id:string,
                translatedFile:string
            }
        ]
    };
    categories?: string[];
    coordinates: {
        lat: string,
        lon: string
    };
    creator?: string;
    description: {
        originalDescription: string;
        translations:[
            {
                idLanguage:string,
                translatedDescription:string
            }
        ]
    };
    name: string;
    coverImage: string;
    images: string[];
    price: number;
    schedule: string;
    status: string;
    year: Date;
}
