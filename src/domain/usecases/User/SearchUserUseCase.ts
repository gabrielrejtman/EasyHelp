import User from "../../entities/User";
import UserRepository from "../../repositories/UserRepository";


export class SearchUsersUseCase {

    constructor(private readonly userRepository: UserRepository) {}

    async execute(name: string): Promise<User[]> {
        const result = await this.userRepository.getUserByName(name);

        return result;
    }
}