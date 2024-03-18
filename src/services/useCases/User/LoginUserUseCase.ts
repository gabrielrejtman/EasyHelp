import { Api } from "../../Api";

export interface ICreateUser {
    registration: string;
    password: string;
}


export class LoginUserUseCase {

    async execute(data: ICreateUser ): Promise<string> {
        const { registration, password } = data;
        const response = await Api.post('/login',{registration, password})
        return response.data
    }
}
