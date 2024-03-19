import User from "../../../domain/entities/User";
import { Api } from "../../Api";

export class SearchUser {

    async execute(data: {name:string}): Promise<User[]> {
        const { name } = data;
        const response = await Api.post('/searchUser',{name})
        return response.data
    }
}
