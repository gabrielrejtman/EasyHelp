import User from "../../../domain/entities/User";
import { IUserData } from "../../../domain/usecases/VerifySessionUseCase";
import { Api } from "../../Api";

export class LoginUserUseCase {

    async execute(data: IUserData): Promise<string | User> {
        const { registration, password } = data;
        const response = await Api.post('/login', { registration, password })
        return response.data
    }
}