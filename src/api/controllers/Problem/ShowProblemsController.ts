import { FastifyInstance } from "fastify";
import { ShowProblemsUseCase } from "../../../domain/usecases/Problem/ShowProblemsUseCase";
import { SearchProblemOpenSearchUseCase } from "../../../domain/usecases/OpenSearch/SearchProblemOpenSearchUseCase";


export default class ShowProblemsController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: ShowProblemsUseCase,
        readonly openSearch: SearchProblemOpenSearchUseCase
    ) {
        server.get('/problems', async () => {
            const result = await useCase.execute();

            await openSearch.execute();

            return result;
        })
    }

}