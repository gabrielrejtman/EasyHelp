import { FastifyInstance } from "fastify";
<<<<<<< HEAD
import { DeleteProblemUseCase } from "../../../domain/usecases/Problem/DeleteProblem/DeleteProblemUseCase";
=======
import { DeleteProblemUseCase } from "../../../domain/usecases/Problem/DeleteProblemUseCase";
>>>>>>> 21fec1d4 (user and problem cruds have been done)


export default class DeleteProblemController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: DeleteProblemUseCase 
    ) {
        server.delete('/problems/:id', async ({params}) => {
            const { id } = params as any;
            await useCase.execute(id);
<<<<<<< HEAD

=======
            
>>>>>>> 21fec1d4 (user and problem cruds have been done)
            return {
                status: 200,
                body: {
                    message: "Problem has successfully been deleted!"
                }
            }
        })
    }

}