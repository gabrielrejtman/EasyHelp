import { FastifyInstance } from "fastify";
import { CreateSupervisorUseCase } from "../../../domain/usecases/Admin/CreateSurpervisorUseCase";

export default class CreateProblemController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: CreateSupervisorUseCase 
    ) {
        server.post('/supervisors', async ({body}) => {
            const { id, name } = body as any; 
            const result = await useCase.execute({ id, name });

            return result;
        })
    }

}