import { FastifyInstance } from "fastify";
import { CreateProblemUseCase } from "../../../domain/usecases/Problem/CreateProblemUseCase";
import { CreateProblemOpenSearchUseCase } from "../../../domain/usecases/OpenSearch/CreateProblemOpenSearchUseCase";


export default class CreateProblemController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: CreateProblemUseCase,
        readonly openSearch: CreateProblemOpenSearchUseCase
    ) {
        server.post('/problems', async ({body}) => {
            const { title, description, category, difficulty } = <any>body;
            
            const result = await useCase.execute({ title, description, category, difficulty });

            //////await openSearch.execute( { id, title, description, category, difficulty } );

            
        
            return result;
        })
    }

}
