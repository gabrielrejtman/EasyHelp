import { FastifyInstance } from "fastify";
import { ShowUsersUseCase } from "../../../domain/usecases/User/ShowUsersUseCase";


export default class ShowUsersController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: ShowUsersUseCase 
    ) {
        server.get('/users', async () => {
            const result = await useCase.execute();

            return result;
        })
    }

}