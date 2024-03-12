import { FastifyInstance } from "fastify";
import { CreateOrderUseCase } from "../../../domain/usecases/CreateOrder/CreateOrderUseCase";


export default class CreateOrderController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: CreateOrderUseCase 
    ) {
        server.post('/order', async ({body}) => {
            const { description, status, rating, priority, sector} = body as any;
            await useCase.execute({description, status, rating, priority, sector});

            return {
                status: 201,
                body: {
                    message: "The order has been requested"
                }
            }
        })
    }

}