import UserRepository from "../repositories/UserRepository";
import { compare } from "bcrypt";


export interface ICreateUser {
    id: string;
    password: string;
}

export class VerifySessionUseCase {

    constructor(private readonly userRepository: UserRepository) {}

    async execute(data: ICreateUser): Promise<boolean> {
        const { id, password } = data;

        const user = await this.userRepository.getUsers(id);
        if (!user) {
            throw new Error("User Doesn't Exist");
        }

        const matchPassword = await compare(password, user.password);
        if (!matchPassword) {
            throw new Error("Incorrect id or password");
        }


        return matchPassword;
    }
}