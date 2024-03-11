import { FastifyInstance } from "fastify";
import { ShowProblemsUseCase } from "../../../domain/usecases/Problem/ShowProblemsUseCase";


export default class ShowProblemsController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: ShowProblemsUseCase 
    ) {
        server.get('/problems', async () => {
            const result = await useCase.execute();

            return result;
        })
    }

}