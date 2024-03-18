import { FastifyInstance } from "fastify";
import { DeleteProblemUseCase } from "../../../domain/usecases/Problem/DeleteProblemUseCase";
import { DeleteProblemOpenSearchUseCase } from "../../../domain/usecases/OpenSearch/DeleteProblemOpenSearchUseCase";


export default class DeleteProblemController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: DeleteProblemUseCase,
        readonly openSearch: DeleteProblemOpenSearchUseCase 
    ) {
        server.delete('/problems/:id', async ({params}) => {
            const { id } = params as any;
            await useCase.execute(id);
            await openSearch.execute(id);
            
            return {
                status: 200,
                body: {
                    message: "Problem has successfully been deleted!"
                }
            }
        })
    }

}