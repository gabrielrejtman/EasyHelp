import { FastifyInstance } from "fastify";
import { CreateUserUseCase } from "../../../domain/usecases/User/CreateUserUseCase";


export default class CreateUserController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: CreateUserUseCase 
    ) {
        server.post('/users', async ({body}) => {
            const { id, name, password } = body as any;
            await useCase.execute({ id, name , password });

            return {
                status: 201,
                body: {
                    message: "The user has been created."
                }
            }
        })
    }

}