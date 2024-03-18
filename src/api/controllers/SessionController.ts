import { FastifyInstance } from "fastify";
import { VerifySessionUseCase } from "../../domain/usecases/VerifySessionUseCase";

export default class SessionController {

    constructor(
        readonly server: FastifyInstance,
        readonly usecase: VerifySessionUseCase
    ) {
        server.post('/login', async ({ body }) => {
            const { registration, password } = body as any;

            const result = await usecase.execute({ registration, password });

            return result;
        })
    }

}
