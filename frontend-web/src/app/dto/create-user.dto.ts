export class UserCreateDto {
        email: String;
        password: String;
        name: String;
        role: String;
        picture: String;
        city: String;
        language: String;
        constructor(e: string, p: string, n: string, role: string, pic: string, ci: string, langua: string) {
                this.email = e;
                this.password = p;
                this.name = n;
                this.role = role;
                this.picture = pic;
                this.city = ci;
                this.language = langua;
            }
}
