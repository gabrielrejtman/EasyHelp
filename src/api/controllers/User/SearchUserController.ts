import { FastifyInstance } from "fastify";
import { SearchUsersUseCase } from "../../../domain/usecases/User/SearchUserUseCase";


export default class SearchUsersController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: SearchUsersUseCase 
    ) {
        server.post('/searchUser', async ({body}) => {
            const { name } = body as any;
            const result = await useCase.execute(name);

            return result;
        })
    }

}