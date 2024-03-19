import User from "../../entities/User";
import UserRepository from "../../repositories/UserRepository";
import UseCase from "../../shared/usecase";


export class DeleteUserUseCase implements UseCase<string, User | null> {

    constructor(private readonly userRepository: UserRepository) {}

    async execute(data: string) {
        const id = data;
        const result = await this.userRepository.delete(id);

        return result;
    }
}