import { FastifyInstance } from "fastify";
<<<<<<< HEAD
import { DeleteUserUseCase } from "../../../domain/usecases/User/DeleteUser/DeleteUserUseCase";
=======
import { DeleteUserUseCase } from "../../../domain/usecases/User/DeleteUserUseCase";
>>>>>>> 21fec1d4 (user and problem cruds have been done)


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