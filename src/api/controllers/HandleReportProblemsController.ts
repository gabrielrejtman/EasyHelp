import { FastifyInstance } from "fastify";
import { HandleReportProblemsUseCase } from "../../domain/usecases/HandleReportProblemsUseCase";


export default class HandleReportProblemsController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: HandleReportProblemsUseCase 
    ) {
        server.get('/report', async () => {
            const result = await useCase.execute();

            return result;
        })
    }

}