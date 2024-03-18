import User from "../../../domain/entities/User";
import { Api } from "../../Api";

export class ShowUsers {

    async execute(): Promise<User[]> {
        const response = await Api.get('/users')
        return response.data
    }
}
