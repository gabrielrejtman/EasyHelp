import { Role } from "@prisma/client";


export default interface User {
    id?: string;
    registration: string;
    name: string;
    password: string;
    role: Role;
    createdAt: Date;
}