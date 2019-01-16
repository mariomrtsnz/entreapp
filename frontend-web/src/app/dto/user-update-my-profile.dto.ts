export class UserUpdateMyProfileDto {
    role: String;
    name: String;
    password: String;
    email: String;
    city: String;
    language: String;

    constructor(role: string, name: string, password: string, email: string, city: string, language: string) {
        this.role = role;
        this.name = name;
        this.password = password;
        this.email = email;
        this.city = city;
        this.language = language;

    }
}


