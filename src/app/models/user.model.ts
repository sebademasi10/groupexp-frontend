import { Role } from "./role.model";

export class User {
    name: string;
    surname: string;
    email: string;
    password: string;
    birthDate: string;
    img: string;
    role: string;
    active: boolean;

    constructor(
        name?: string,
        surname?: string,
        email?: string,
        password?: string,
        birthDate?: string,
        role?: string,
        img?: string,
        active?: boolean,
    ) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
        this.img = img;
        this.role = role;
        this.active = active;
    }
}


