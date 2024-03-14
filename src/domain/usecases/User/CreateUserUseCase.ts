import User from "../../entities/User";
import UserRepository from "../../repositories/UserRepository";
import { hash } from "bcrypt";


export interface ICreateUser {
    id: string;
    name: string;
    password: string;
}

export class CreateUserUseCase {

    constructor(private readonly userRepository: UserRepository) {}

    async execute(data: ICreateUser): Promise<User> {
        const { id, name, password} = data;
        const passwordHashed = await hash(password, 8);

        const userAlreadyExists = await this.userRepository.getUsers(id);
        if (userAlreadyExists) {
            throw new Error("User Already Exists");
        }

        return await this.userRepository.create({ id, name, password: passwordHashed });
    }
}