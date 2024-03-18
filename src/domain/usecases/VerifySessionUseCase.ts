import { Role } from "@prisma/client";
import UserRepository from "../repositories/UserRepository";
import { compare } from "bcrypt";


export interface ICreateUser {
    registration: string;
    password: string;
    name:string;
    role: Role;
}

export class VerifySessionUseCase {

    constructor(private readonly userRepository: UserRepository) {}

    async execute(data: ICreateUser): Promise<boolean | string> {
        const { registration, password } = data;

        const user = await this.userRepository.getUser(registration);
        if (!user) {
            return "User Doesn't Exist";
        }

        const matchPassword = await compare(password, user.password);
        if (!matchPassword) {
            return "Incorrect id or password";
        }

        return user.role;
    }
}