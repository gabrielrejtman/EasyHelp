import { FastifyInstance } from "fastify";
import { CreateUserUseCase } from "../../usecases/CreateUser/CreateUserUseCase";

export default class CreateUserController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: CreateUserUseCase 
    ) {
        server.post('/users', async ({body}) => {
            const { id, name, sector, password } = body as any;
            await useCase.execute({ id, name, sector, password });

            return {
                status: 201,
                body: {
                    message: "The user has been created."
                }
            }
        })
    }

}