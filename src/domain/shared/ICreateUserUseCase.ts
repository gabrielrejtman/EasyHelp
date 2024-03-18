import { Role } from "@prisma/client";

export interface ICreateUserUseCase {
    registration: string;
    name: string;
    role: Role;
}