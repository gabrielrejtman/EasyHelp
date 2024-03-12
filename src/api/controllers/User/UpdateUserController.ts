import { FastifyInstance } from "fastify";
import { UpdateUserUseCase } from "../../../domain/usecases/User/UpdateUserUseCase";


export default class UpdateUserController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: UpdateUserUseCase 
    ) {
        server.put('/users/:id', async ({body, params}) => {
            const { id } = params as any;
            const { name , password } = body as any;
            const result = await useCase.execute(id, { name , password });

            return result;
        })
    }

}