import { Role } from "@prisma/client";
import UserRepository from "../../repositories/UserRepository";
import { hash } from "bcrypt";
import { ICreateUserUseCase } from "../../shared/ICreateUserUseCase";


export interface ICreateUser {
    registration: string;
    name: string;
    password: string;
    role: Role;
}

export class CreateUserUseCase {

    constructor(private readonly userRepository: UserRepository) {}

    async execute(data: ICreateUserUseCase) {
        const { registration, name, role } = data;

        const userAlreadyExists = await this.userRepository.getUser(registration);
        if (userAlreadyExists) {
            throw new Error("User Already Exists");
        }

        // sets the user password equal to registration and hashes password                     
        const password = registration; 
        const hashedPassword = await hash(password, 8);


        const result = await this.userRepository.create({ registration, name, role, password: hashedPassword });      
        const { password: _, ...user } = result;

        return user;
    }
}