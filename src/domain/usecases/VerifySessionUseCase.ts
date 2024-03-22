import UserRepository from "../repositories/UserRepository";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";


export interface IUserData {
    registration: string;
    password: string;
}


export class VerifySessionUseCase {

    constructor(private readonly userRepository: UserRepository) { }

    async execute(data: IUserData) {
        const { registration, password } = data;

        const user = await this.userRepository.getUser(registration);

        if (!user) {
            return "Incorrect id or password";
        }

        // verifies password 
        const matchPassword = await compare(password, user.password);
        if (!matchPassword) {
            return "Incorrect id or password";
        }

        // sets a token to validate user login
        const token = jwt.sign(
            { id: user.id! },
            "ffdea0c3bed13906e0d6e9a59a4a6909",
            { expiresIn: '1h' }
        );

        const { password: _, ...userLogin } = user;

        return user;
    }
}