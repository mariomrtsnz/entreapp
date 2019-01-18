export class UserUpdateMyProfileDto {
    id: string;
    role: String;
    name: String;
    password: String;
    email: String;
    city: String;
    language: String;

    constructor(id: string,role: string, name: string, password: string, email: string, city: string, language: string) {
        this.id = id;
        this.role = role;
        this.name = name;
        this.password = password;
        this.email = email;
        this.city = city;
        this.language = language;

    }
}


