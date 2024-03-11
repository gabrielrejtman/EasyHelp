import User from "../../entities/User";
import UserRepository from "../../repositories/UserRepository";


export interface IUpdateUser {
    name: string;
    password: string;
}

export class UpdateUserUseCase {

    constructor(private readonly userRepository: UserRepository) {}

    async execute(id: string, data: IUpdateUser): Promise<User> {
        const { name, password} = data;

        return await this.userRepository.updateUser(id, { name, password });
    }
}