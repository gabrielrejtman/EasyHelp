import { FastifyInstance } from "fastify";
<<<<<<< HEAD
import { CreateProblemUseCase } from "../../../domain/usecases/Problem/CreateProblem/CreateProblemUseCase";
=======
import { CreateProblemUseCase } from "../../../domain/usecases/Problem/CreateProblemUseCase";
>>>>>>> 21fec1d4 (user and problem cruds have been done)


export default class CreateProblemController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: CreateProblemUseCase 
    ) {
        server.post('/problems', async ({body}) => {
            const { title, description, category, difficulty } = body as any;
            const result = await useCase.execute({ title, description, category, difficulty });

            return result;
        })
    }

}