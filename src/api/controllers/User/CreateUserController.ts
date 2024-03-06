import { FastifyInstance } from "fastify";
<<<<<<< HEAD
import { CreateUserUseCase } from "../../../domain/usecases/User/CreateUser/CreateUserUseCase";
=======
import { CreateUserUseCase } from "../../../domain/usecases/User/CreateUserUseCase";

>>>>>>> 21fec1d4 (user and problem cruds have been done)

export default class CreateUserController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: CreateUserUseCase 
    ) {
        server.post('/users', async ({body}) => {
            const { id, name, sector, password } = body as any;
            await useCase.execute({ id, name, sector, password });

            return {
                status: 201,
                body: {
                    message: "The user has been created."
                }
            }
        })
    }

}