import { FastifyInstance } from "fastify";
import { UpdateProblemUseCase } from "../../../domain/usecases/Problem/UpdateProblemUseCase";


export default class DeleteProblemController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: UpdateProblemUseCase 
    ) {
        server.put('/problems/:id', async ({body, params}) => {
            const { id } = params as any;
            const { title, description, category, difficulty } = body as any;
            const result = await useCase.execute(id, { title, description, category, difficulty });
            
            return result;
        })
    }

}