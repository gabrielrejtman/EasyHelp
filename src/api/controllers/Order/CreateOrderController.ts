import { FastifyInstance } from "fastify";
import { CreateOrderUseCase } from "../../../domain/usecases/Order/CreateOrderUseCase";
//import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";


export default class CreateOrderController {
    constructor(
        readonly server: FastifyInstance,
        readonly useCase: CreateOrderUseCase
    ) {
        server.post('/order', async ({ body }) => {
            const { description, status, rating, priority, sector, supervisorId, problemId } = body as any;
            const result = await useCase.execute({ description, status, rating, priority, sector, supervisorId, problemId });
            return result;
        })
    }

}