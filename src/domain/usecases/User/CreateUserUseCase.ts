import { Role } from "@prisma/client";
import User from "../../entities/User";
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

    async execute(data: ICreateUserUseCase): Promise<User> {
        const { registration, name, role } = data;

        const userAlreadyExists = await this.userRepository.getUser(registration);
        if (userAlreadyExists) {
            throw new Error("User Already Exists");
        }

        // sets the user password equal to registration and hashes password                       
        const password = registration; 
        await hash(password, 8);     
    
        return await this.userRepository.create({ registration, name, role, password });;
    }
}