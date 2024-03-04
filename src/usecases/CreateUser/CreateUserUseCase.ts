import User from "../../entities/User";
import UserRepository from "../../repositories/UserRepository";
import UseCase from "../../shared/usecase";
import { ICreateUser } from "./ICreateUser";

export class CreateUserUseCase implements UseCase<ICreateUser, User> {

    constructor(private readonly userRepository: UserRepository) {}

    async execute(data: ICreateUser): Promise<User> {
        const { id, name, sector, password} = data;

        const userAlreadyExists = await this.userRepository.getUsers(id);
        if (userAlreadyExists) {
            throw new Error("User already exists!");
        }

        return await this.userRepository.create({ id, name, sector, password })
    }
}