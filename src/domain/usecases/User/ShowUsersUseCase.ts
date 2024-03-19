import User from "../../entities/User";
import UserRepository from "../../repositories/UserRepository";


export class ShowUsersUseCase {

    constructor(private readonly userRepository: UserRepository) {}

    async execute(): Promise<User[]> {
        const result = await this.userRepository.getAllUsers();

        return result;
    }
}