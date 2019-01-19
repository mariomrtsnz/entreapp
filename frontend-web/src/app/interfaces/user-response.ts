export interface UserResponse {
    id: number;
    name: string;
    role: string;
    picture: string;
    password: string;
    email: string;
    createAt: string;
    country: string;
    language: string;
    badges: {
        id: string,
        points: number
    };
}
