import { FastifyInstance } from "fastify";
import { CreateProblemUseCase } from "../../usecases/CreateProblem/CreateProblemUseCase";


export default class CreateProblemController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: CreateProblemUseCase 
    ) {
        server.post('/problems', async ({body}) => {
            const { title, description, category, difficulty } = body as any;
            await useCase.execute({ title, description, category, difficulty });

            return {
                status: 201,
                body: {
                    message: "Problem has successfully been created!"
                }
            }
        })
    }

}