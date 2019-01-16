export class UserUpdateMyProfileDto {
    role: String;
    name: String;
    password: String;
    email: String;
    city: String;
    languaje: String;
    favs: String[];
    friends: String[];
    constructor(role: string, name: string, password: string,
         email: string, city: string, languaje: string, favs: string[], friends: string[]) {
        this.role = role;
        this.name = name;
        this.password = password;
        this.email = email;
        this.city = city;
        this.languaje = languaje;
        this.favs = favs;
        this.friends = friends;
    }
}


