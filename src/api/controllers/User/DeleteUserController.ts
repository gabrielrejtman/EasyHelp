import { FastifyInstance } from "fastify";
import { DeleteUserUseCase } from "../../../domain/usecases/User/DeleteUserUseCase";


export default class DeleteUserController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: DeleteUserUseCase 
    ) {
        server.delete('/users/:id', async ({params}) => {
            const { id } = params as any;
            await useCase.execute(id);

            return {
                status: 200,
                body: {
                    message: "User has been deleted."
                }
            }
        })
    }

}