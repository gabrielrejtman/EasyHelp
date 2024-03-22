import { FastifyInstance } from "fastify";
import { FindProblemUseCase } from "../../../domain/usecases/Problem/FindProblemUseCase";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";


export default class FindProblemController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: FindProblemUseCase
    ) {
        server.post('/search_problem', async ({ body }) => {
            const { title } = <any>body;
            const searchTerm = title;
            const result = await useCase.execute(searchTerm);

            return result;
        })
    }

}