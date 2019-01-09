export class LoginDto {
    email: string;
    password: string;

    constructor(e: string, p: string) {
        this.email = e;
        this.password = p;
    }
}
