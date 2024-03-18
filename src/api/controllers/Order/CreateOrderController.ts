import { FastifyInstance } from "fastify";
import { CreateOrderUseCase } from "../../../domain/usecases/Order/CreateOrderUseCase";


export default class CreateOrderController {
    constructor(
        readonly server: FastifyInstance,
        readonly useCase: CreateOrderUseCase 
    ) {
        server.post('/order', async ({body}) => {
            const { description, status, rating, priority, sector} = body as any;
            const result = await useCase.execute({description, status, rating, priority, sector});

            return result;
        })
    }

}