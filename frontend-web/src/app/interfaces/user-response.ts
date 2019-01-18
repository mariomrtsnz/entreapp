export interface UserResponse {
    id: number;
    name: string;
    role: string;
    picture: string;
    email: string;
    createAt: string;
    country: string;
    languaje: string;
    badges: {
        id: string,
        points: number
    }
}
