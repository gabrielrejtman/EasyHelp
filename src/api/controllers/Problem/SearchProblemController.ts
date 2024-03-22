import { FastifyInstance } from "fastify";
import { SearchProblemOpenSearchUseCase } from "../../../domain/usecases/OpenSearch/SearchProblemOpenSearchUseCase";
import { SearchsProblemsUseCase } from "../../../domain/usecases/Problem/SearchProblemUseCase";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";


export default class SearchProblemController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: SearchsProblemsUseCase,
        readonly openSearch: SearchProblemOpenSearchUseCase
    ) {
        server.post('/search', async ({body}) => {
            const { title } = <any>body;
            const searchTerm = title;

            const result = await useCase.execute(searchTerm);
            //const result = await openSearch.execute(searchTerm);
        
            return result;
        })
    }

}
