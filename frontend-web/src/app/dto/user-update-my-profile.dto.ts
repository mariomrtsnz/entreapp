export class UserUpdateMyProfileDto {
    role: String;
    name: String;
    password: String;
    email: String;
    city: String;
    languaje: String;
    
    constructor(role: string, name: string, password: string, email: string, city: string, languaje: string) {
        this.role = role;
        this.name = name;
        this.password = password;
        this.email = email;
        this.city = city;
        this.languaje = languaje;
        
    }
}


