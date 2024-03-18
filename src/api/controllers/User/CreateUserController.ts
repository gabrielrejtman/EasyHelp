import { FastifyInstance } from "fastify";
import { CreateUserUseCase } from "../../../domain/usecases/User/CreateUserUseCase";


export default class CreateUserController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: CreateUserUseCase 
    ) {
        server.post('/users', async ({body}) => {
            const { registration, name, role } = body as any;
            const result = await useCase.execute({ registration, name, role });

            return result;
        })
    }

}