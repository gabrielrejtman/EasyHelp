import { FastifyInstance } from "fastify";
import { CreateProblemUseCase } from "../../../domain/usecases/Problem/CreateProblemUseCase";


export default class CreateProblemController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: CreateProblemUseCase 
    ) {
        server.post('/problems', async ({body}) => {
            const { title, description, category, difficulty } = <any>body;
            const result = await useCase.execute({ title, description, category, difficulty });

            return result;
        })
    }

}